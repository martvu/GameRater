import FilterModal from '@/components/FilterModal';
import Filters from '@/components/Filters';
import Footer from '@/components/Footer';
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
          <div className="flex justify-between md:justify-end px-4">
            <div className="block md:hidden">
              <FilterModal />
            </div>
            <SortBy />

          </div>
          <div className='flex justify-center'>
             <GameList />
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
}
