import FilterModal from '@/components/FilterModal';
import Filters from '@/components/Filters';
import { GameCard } from '@/components/GameCard';
import SortBy from '@/components/SortBy';
import Pagination from '@/components/Pagination';
import { useState } from 'react';
import withLayout from '@/lib/withLayout';
import { useQuery } from '@apollo/client';
import { Game } from '../gql/graphql';
import { gql } from '@/gql';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { selectedGenresState, selectedPlatformsState } from '@/state/atoms.ts';

const SEARCH_GAMES = gql(`
  query SearchGames($query: String, $limit: Int!, $offset: Int!, $platforms: [Int], $genres: [Int]) {
    search(query: $query, limit: $limit, offset: $offset, platforms: $platforms, genres: $genres) {
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

function BaseGameListPage() {
  const { keyword } = useParams<{ keyword?: string }>();
  const limit = 24;
  const [currentPage, setCurrentPage] = useState(1);

  // Ensure that keyword is a string, even if it's an empty string.
  const selectedPlatforms = useRecoilValue(selectedPlatformsState);
  const selectedGenres = useRecoilValue(selectedGenresState);

  const { loading, error, data } = useQuery(SEARCH_GAMES, {
    variables: {
      limit: limit,
      offset: limit * (currentPage - 1),
      platforms: selectedPlatforms,
      genres: selectedGenres,
      query: keyword,
    },
  });
  console.log(selectedPlatforms);
  console.log(selectedGenres);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error); // Log the error to the console
    return <p>Error: {error.message}</p>; // Display the error message
  }

  /*  if (data?.search.count === 0) {
    return <p>No games found.</p>;
  }
 */
  return (
    <div className="grid flex-grow grid-cols-1 justify-center md:grid-cols-[auto,1fr] md:justify-normal">
      <div className="ml-4 hidden md:block">
        <Filters />
      </div>

      <div className="overflow-x-hidden px-8">
        <div className="z-15 sticky top-0 flex items-center justify-between bg-background py-1 pb-4 md:justify-end">
          <div className="block md:hidden">
            <FilterModal />
          </div>
          <SortBy />
        </div>
        <div className="flex mb-2 text-muted-foreground opacity-80">
          <p className="text-sm">{data?.search.count} results</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-center gap-4">
          {data?.search.games?.map((game: Game | null | undefined) => (
            <div
              className="m-1 flex justify-center md:justify-normal"
              key={game?._id}
            >
              {game && <GameCard game={game} />}
            </div>
          ))}
        </div>
        <div className="my-2 flex w-full justify-center">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={Math.ceil((data?.search.count || 1) / limit) || 1}
          />
        </div>
      </div>
    </div>
  );
}

const GameListPage = withLayout(BaseGameListPage);

export default GameListPage;
