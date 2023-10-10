import FilterModal from '@/components/FilterModal';
import Filters from '@/components/Filters';
import Footer from '@/components/Footer';
import { GameCard } from '@/components/GameCard';
import Botw from '../assets/botw.jpeg';
import { gameData } from '@/components/GameData';
import SortBy from '@/components/SortBy';
import Nav from '@/components/Nav';
import Pagination from '@/components/Pagination';
import { useState } from 'react';

export default function GameListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex-grow grid grid-cols-1 justify-center md:grid-cols-[auto,1fr] md:justify-normal overflow-auto">
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
            {gameData.slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage)
              .map(game => (
                <div
                  className="m-1 flex justify-center md:justify-normal"
                  key={game.title}
                >
                  <GameCard
                    title={game.title}
                    description={game.description}
                    image={game.image ? game.image : Botw}
                    rating={game.rating}
                  />
                </div>
              ))}
          </div>
          <div className="flex w-full justify-center mt-2">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              gamesPerPage={gamesPerPage}
              gameData={gameData}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
