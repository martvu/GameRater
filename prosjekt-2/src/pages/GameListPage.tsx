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
        <div className='md:block hidden ml-4'>
          <Filters />
        </div>
        
        <div className="flex flex-col">
          <div className="flex justify-between md:justify-end">
            <div className="block md:hidden ml-20">
              <FilterModal />
            </div>
            <div className='mr-20'>
              <SortBy />
            </div>
            
          </div>
          <div className='flex justify-center'>
             <GameList />
          </div>
         
        </div>
      </div>
    </div>
  );
}
