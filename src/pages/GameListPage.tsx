import FilterModal from '@/components/FilterModal';
import Filters from '@/components/Filters';
import { GameCard } from '@/components/GameCard';
import Botw from '../assets/botw.jpeg';
import { gameData } from '@/components/GameData';
import SortBy from '@/components/SortBy';
import Pagination from '@/components/Pagination';
import { useState } from 'react';
import withLayout from '@/lib/withLayout';

function BaseGameListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;

  return (
    <div className="grid flex-grow grid-cols-1 justify-center overflow-auto md:grid-cols-[auto,1fr] md:justify-normal">
      <div className="ml-4 hidden md:block">
        <Filters />
      </div>
      <div className="overflow-x-hidden px-8">
        <div className="sticky top-0 z-10 flex justify-between bg-background py-1 pb-4 md:justify-end">
          <div className="block md:hidden">
            <FilterModal />
          </div>
          <SortBy />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-center gap-4">
          {gameData
            .slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage)
            .map((game, index) => (
              <div
                className="m-1 flex justify-center md:justify-normal"
                key={game.title}
              >
                <GameCard
                  id={index} // or some  unique identifier
                  title={game.title}
                  description={game.description}
                  image={game.image ? game.image : Botw}
                  rating={game.rating}
                />
              </div>
            ))}
        </div>
        <div className="mt-2 flex w-full justify-center">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            gamesPerPage={gamesPerPage}
            gameData={gameData}
          />
        </div>
      </div>
    </div>
  );
}

const GameListPage = withLayout(BaseGameListPage);
export default GameListPage;
