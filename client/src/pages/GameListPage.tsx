import FilterModal from '@/components/FilterModal';
import Filters from '@/components/Filters';
import { GameCard } from '@/components/GameCard';
import SortBy from '@/components/SortBy';
import Pagination from '@/components/Pagination';
import { useState } from 'react';
import withLayout from '@/lib/withLayout';
import { useQuery } from '@apollo/client';
import { Game } from '../gql/graphql';
import { gql } from '../gql/';

const GET_GAMES = gql(`
  query GetGames($limit: Int) {
    getGames(limit: $limit) {
      first_release_date
      summary
      cover_image_id
      name
      _id
    }
  }
`);

function BaseGameListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;
  const { loading, error, data } = useQuery(GET_GAMES, {
    variables: { limit: 100 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="grid flex-grow grid-cols-1 justify-center md:grid-cols-[auto,1fr] md:justify-normal">
      <div className="ml-4 hidden md:block">
        <Filters />
      </div>

      <div className="overflow-x-hidden px-8">
        <div className="z-15 sticky top-0 flex justify-between bg-background py-1 pb-4 md:justify-end">
          <div className="block md:hidden">
            <FilterModal />
          </div>
          <SortBy />
        </div>
        <div className="text-muted-foreground"></div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-center gap-4">
          {data?.getGames
            .slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage)
            .map((game: Game) => (
              <div
                className="m-1 flex justify-center md:justify-normal"
                key={game.name}
              >
                <GameCard game={game} />
              </div>
            ))}
        </div>
        <div className="mt-2 flex w-full justify-center">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={gamesPerPage}
            data={data?.getGames as Game[]}
          />
        </div>
      </div>
    </div>
  );
}

const GameListPage = withLayout(BaseGameListPage);
export default GameListPage;
