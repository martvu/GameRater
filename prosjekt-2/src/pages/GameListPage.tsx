import FilterModal from '@/components/FilterModal';
import Filters from '@/components/Filters';
import GameList from '@/components/GameList';
import Nav from '@/components/Nav';
import SortBy from '@/components/SortBy';

export default function GameListPage() {
  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex flex-col md:flex-row">
        <div className='md:block hidden'>
          <Filters />
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="flex justify-between md:justify-end">
            <div className="block md:hidden">
              <FilterModal />
            </div>
            <SortBy />
          </div>
          <GameList />
        </div>
      </div>
    </div>
  );
}
