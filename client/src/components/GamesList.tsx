import { useQuery } from '@apollo/client';
import { gql } from '../gql/';
import { GameCard } from './GameCard';
import { Game } from '@/gql/graphql';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedGenresState, selectedPlatformsState, sortByState } from '@/state/atoms';
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
  }
`);

export default function GamesList() {
  const { keyword } = useParams<{ keyword?: string }>();
  const [currentPage, setCurrentPage] = useRecoilState(pageState);
  const [sortBy, setSortBy] = useRecoilState(sortByState);
  const limit = 24;

   // Ensure that keyword is a string, even if it's an empty string.
   const selectedPlatforms = useRecoilValue(selectedPlatformsState);
   const selectedGenres = useRecoilValue(selectedGenresState);
 
 
  const { loading, error, data } = useQuery(GET_GAMES, {
    variables: { limit, offset: limit * (currentPage - 1), sortBy: sortBy,  platforms: selectedPlatforms,
      genres: selectedGenres,
      query: keyword,
 },
  });

  useEffect(() => {
    const sortByFromStorage = localStorage.getItem('selectedSortBy');
    if (sortByFromStorage) {
      setSortBy(JSON.parse(sortByFromStorage)); // Assuming this is the setter from useRecoilState
    }
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
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
