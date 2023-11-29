import FilterModal from '@/components/FilterModal';
import Filters from '@/components/Filters';
import SortBy from '@/components/SortBy';
import GamesList from '@/components/GamesList';
import withLayout from '@/lib/withLayout';
import UserFilters from '@/components/UserFilters';

function BaseGameListPage() {
  return (
    <section className="grid flex-grow grid-cols-1 justify-center md:grid-cols-[auto,1fr] md:justify-normal">
      {/* Filter section visible on larger screens */}
      <aside className="fixed top-16 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 px-2 pt-3 md:sticky md:block ">
        <Filters />
      </aside>
      {/* Games list section */}
      <section className="pl-2 pr-2 pt-4 sm:pr-4">
        <div className="z-10 flex items-center justify-between gap-1 bg-background pb-2">
          {/* Filter modal visible on smaller screens */}
          <div className="block md:hidden">
            <FilterModal />
          </div>
          <UserFilters />
          <SortBy />
        </div>
        <GamesList />
      </section>
    </section>
  );
}

const GameListPage = withLayout(BaseGameListPage);

export default GameListPage;
