import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react'; // Make sure to install lucide-react if you haven't
import FilterItems from './FilterItems';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useRecoilValue} from 'recoil';
import { genresListState, platformsListState } from '@/state/atoms';

export default function Filters() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const genres = useRecoilValue(genresListState);
  const platforms = useRecoilValue(platformsListState);

  return (
    <>
      <div
        className={cn(
          'flex h-full min-h-screen flex-col items-start overflow-y-auto text-left',
          !isCollapsed && 'max-w-[210px]'
        )}
      >
        <Button
          className="hidden md:flex m-1"
          variant="ghost"
          onClick={toggleCollapse}
          aria-label="toggle filters"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!isCollapsed && <span className="ml-2">Hide</span>}
        </Button>
        <div className="block pl-5">
          <h1
            className={`text-md mt-4 text-left font-bold tracking-wider md:text-xl ${
              isCollapsed ? 'hidden' : ''
            }`}
          >
            Filters
          </h1>
          {!isCollapsed && (
            <>
              <FilterItems filters={platforms} filterType="platforms" />
              <FilterItems filters={genres} filterType="genres" />
            </>
          )}
        </div>
      </div>
    </>
  );
}
