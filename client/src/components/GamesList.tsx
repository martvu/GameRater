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
  sortByState,
  userState,
} from '@/state/atoms';
import { pageState } from '@/state/atoms';
import Pagination from './Pagination';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Heart, Star } from 'lucide-react';

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
  const [showFavorites, setShowFavorites] = useState(false);
  const [showReviewedGames, setShowReviewedGames] = useState(false);
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

  function handleShowFavorites() {
    setShowFavorites(!showFavorites);
    setCurrentPage(1);
  }

  function handleShowReviewedGames() {
    setShowReviewedGames(!showReviewedGames);
    setCurrentPage(1);
  }

  useEffect(() => {
    refetch();
  }, [showFavorites, refetch]);

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
    <main>
      <div className="mb-2 flex items-center gap-2 text-muted-foreground opacity-80">
        <p className="w-[100px] text-left text-sm">
          {data?.search.count} results
        </p>
        {/* Show favorites and reviewed buttons if user is signed in */}
        {user._id && (
          <>
            <Button
              className="flex gap-1"
              size="sm"
              variant={showFavorites ? 'destructive' : 'secondary'}
              onClick={handleShowFavorites}
            >
              <p>Favorites</p>
              <Heart size={16} />
            </Button>
            <Button
              className="flex gap-1"
              size="sm"
              variant={showReviewedGames ? 'destructive' : 'secondary'}
              onClick={handleShowReviewedGames}
            >
              <p>Reviewed</p>
              <Star size={16} />{' '}
            </Button>
          </>
        )}
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-center gap-4">
        {data?.search.games?.map((game: Game | null | undefined) => (
          <li
            className="m-1 flex justify-center md:justify-normal"
            key={game?._id}
          >
            {game && <GameCard game={game} />}
          </li>
        ))}
      </ul>
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
