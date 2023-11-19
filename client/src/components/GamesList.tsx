import { useQuery } from '@apollo/client';
import { gql } from '../gql/';
import { GameCard } from './GameCard';
import { Game } from '@/gql/graphql';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  genresListState,
  platformsListState,
  selectedGenresState,
  selectedPlatformsState,
  showFavoritesState,
  showReviewedGamesState,
  sortByState,
  userState,
} from '@/state/atoms';
import { pageState } from '@/state/atoms';
import Pagination from './Pagination';
import { useEffect } from 'react';
import Loading from './Loading';
import { useParams } from 'react-router-dom';

const GET_GAMES = gql(`
  query Search($userId: String, $showFavorites: Boolean, $showReviewedGames: Boolean, $query: String, $limit: Int!, $offset: Int!, $sortBy: GameSortInput, $platforms: [Int!], $genres: [Int!]) {
    search(userId: $userId, showFavorites: $showFavorites, showReviewedGames: $showReviewedGames, query: $query, limit: $limit, offset: $offset, sortBy: $sortBy, platforms: $platforms, genres: $genres) {
      count
      games{
        _id
        aggregated_rating
        first_release_date
        summary
        cover_image_id
        name
      }
      filters {
        genres 
        platforms
      }
    }
  }
`);

export default function GamesList() {
  const { keyword } = useParams<{ keyword?: string }>();
  const [currentPage, setCurrentPage] = useRecoilState(pageState);
  const [sortBy, setSortBy] = useRecoilState(sortByState);
  const selectedPlatforms = useRecoilValue(selectedPlatformsState);
  const selectedGenres = useRecoilValue(selectedGenresState);
  const user = useRecoilValue(userState);
  const showFavorites = useRecoilValue(showFavoritesState);
  const showReviewedGames = useRecoilValue(showReviewedGamesState);
  const setGenresList = useSetRecoilState(genresListState);
  const setPlatformsList = useSetRecoilState(platformsListState);
  const limit = 24;

  // Ensure that keyword is a string, even if it's an empty string.
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
  });

  useEffect(() => {
    refetch();
  }, [showFavorites, showReviewedGames, refetch]);

  useEffect(() => {
    const sortByFromStorage = localStorage.getItem('selectedSortBy');
    if (sortByFromStorage) {
      setSortBy(JSON.parse(sortByFromStorage));
    }
  }, []);

  useEffect(() => {
    if (data?.search.filters) {
      setGenresList(data.search.filters.genres as number[]);
      setPlatformsList(data.search.filters.platforms as number[]);
    }
  }, [data?.search.filters]);

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="mt-1">
      <div className="flex items-center gap-2 pb-4 text-muted-foreground opacity-80">
        <p className="w-[100px] text-left text-sm">
          {data?.search.count} results
        </p>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(175px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] justify-center gap-1 sm:gap-4">
        {data?.search.games?.map((game: Game | null | undefined) => (
          <li className="m-1 flex justify-center" key={game?._id}>
            {game && <GameCard game={game} />}
          </li>
        ))}
      </ul>
      {data?.search.games?.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-foreground">No games found</p>
        </div>
      )}
      <div className="my-2 flex w-full justify-center">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={Math.ceil((data?.search.count || 1) / limit) || 1}
        />
      </div>
    </main>
  );
}
