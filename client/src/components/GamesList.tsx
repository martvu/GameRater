import { useQuery } from '@apollo/client';
import { GameCard } from './GameCard';
import { Game } from '@/gql/graphql';
import { GET_GAMES } from '@/lib/queries';
import Pagination from './Pagination';
import { useEffect } from 'react';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import useParameterState from '@/hooks/useParameterState.tsx';

/**
 * GamesList component
 * Displays a list of games based on filters, search query, and sorting
 * (and pagination, favorites, and reviewed games etc.)
 */
export default function GamesList() {
  const { keyword } = useParams<{ keyword?: string }>();
  const {
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    selectedPlatforms,
    selectedGenres,
    user,
    showFavorites,
    showReviewedGames,
    setGenresList,
    setPlatformsList,
  } = useParameterState();
  const limit = 24;

  const { loading, error, data, refetch } = useQuery(GET_GAMES, {
    variables: {
      limit,
      offset: limit * (currentPage - 1),
      sortBy: sortBy,
      platforms: selectedPlatforms,
      genres: selectedGenres,
      query: keyword,
      userId: user?._id,
      showFavorites,
      showReviewedGames,
    },
    fetchPolicy:
      showFavorites || showReviewedGames ? 'cache-and-network' : 'cache-first',
  });

  useEffect(() => {
    if (showFavorites || showReviewedGames) {
      refetch();
    }
  }, [showFavorites, showReviewedGames, refetch]);

  useEffect(() => {
    const sortByFromStorage = sessionStorage.getItem('selectedSortBy');
    if (sortByFromStorage) {
      setSortBy(JSON.parse(sortByFromStorage));
    }
  }, [setSortBy]);

  useEffect(() => {
    if (data?.search.filters) {
      setGenresList(data.search.filters.genres as number[]);
      setPlatformsList(data.search.filters.platforms as number[]);
    }
  }, [data?.search.filters, setGenresList, setPlatformsList]);

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (loading) return <Loading />;
  if (error)
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="text-xl font-semibold">Could not load data</p>
      </section>
    );

  return (
    <section className="mt-1">
      <article className="flex items-center gap-2 pb-4 text-muted-foreground opacity-80">
        <p className="w-[100px] text-left text-sm">
          {data?.search.count} results
        </p>
      </article>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(175px,1fr))] justify-center gap-1 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:gap-4">
        {data?.search.games?.map((game: Game | null | undefined) => (
          <li
            className="m-1 flex justify-center"
            key={`${game?._id}_${game?.user_rating_count}`}
          >
            {game && <GameCard game={game} />}
          </li>
        ))}
      </ul>
      {data?.search.games?.length === 0 && (
        <article className="flex w-full flex-col items-center justify-center">
          <p className="text-foreground">No games found</p>
        </article>
      )}
      <div className="my-2 flex w-full justify-center pt-2">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={Math.ceil((data?.search.count || 1) / limit) || 1}
        />
      </div>
    </section>
  );
}
