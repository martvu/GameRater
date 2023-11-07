import FilterModal from '@/components/FilterModal';
import Filters from '@/components/Filters';
import SortBy from '@/components/SortBy';
import GamesList from '@/components/GamesList';
import withLayout from '@/lib/withLayout';

function BaseGameListPage() {
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
        <GamesList />
      </div>
    </div>
  );
}

const GameListPage = withLayout(BaseGameListPage);
export default GameListPage;
