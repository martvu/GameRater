import { useQuery } from '@apollo/client';
import { gql } from '../gql/';
import { GameCard } from './GameCard';
import { Game, Genre, Platform } from '@/gql/graphql';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  genresListState,
  platformsListState,
  selectedGenresState,
  selectedPlatformsState,
  sortByState,
} from '@/state/atoms';
import { pageState } from '@/state/atoms';
import Pagination from './Pagination';
import { useEffect } from 'react';
import Loading from './Loading';
import { useParams } from 'react-router-dom';

const GET_GAMES = gql(`
  query Search($query: String, $limit: Int!, $offset: Int!, $sortBy: GameSortInput, $platforms: [Int!], $genres: [Int!]) {
    search(query: $query, limit: $limit, offset: $offset, sortBy: $sortBy, platforms: $platforms, genres: $genres) {
      count
      games{
        _id
        aggregated_rating
        first_release_date
        summary
        cover_image_id
        name
      }
    }
    getFilters(platforms: $platforms, genres: $genres, query: $query) {
      genres {
        id
        name
        gamesCount
      }
      platforms {
        id
        name
        gamesCount
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
  const setGenres = useSetRecoilState(genresListState);
  const setPlatforms = useSetRecoilState(platformsListState);
  const limit = 24;

  // Ensure that keyword is a string, even if it's an empty string.

  const { loading, error, data } = useQuery(GET_GAMES, {
    variables: {
      limit,
      offset: limit * (currentPage - 1),
      sortBy: sortBy,
      platforms: selectedPlatforms,
      genres: selectedGenres,
      query: keyword,
    },
  });

  useEffect(() => {
    const sortByFromStorage = localStorage.getItem('selectedSortBy');
    if (sortByFromStorage) {
      setSortBy(JSON.parse(sortByFromStorage));
    }
  }, []);

  useEffect(() => {
    if (data) {
      setGenres(data.getFilters?.genres as Genre[]);
      setPlatforms(data.getFilters?.platforms as Platform[]);
    }
  }, [data, setGenres, setPlatforms]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
      <div className="mb-2 flex text-muted-foreground opacity-80">
        <p className="text-sm">{data?.search.count} results</p>
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
