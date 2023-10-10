import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react'; // Make sure to install lucide-react if you haven't
import FilterItems from './FilterItems';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Platforms = [
  'PC',
  'PS4',
  'PS5',
  'Xbox One',
  'Xbox Series S/X',
  'Nintendo Switch',
  'Mobile',
];

const Genres = [
  'Action',
  'Action-Adventure',
  'Adventure',
  'Role-Playing',
  'Simulation',
  'Strategy',
  'Sports',
  'Puzzle',
  'Idle',
  'Racing',
  'Educational',
  'Fighting',
  'Shooter',
  'Platformer',
  'Rhythm',
  'Visual Novel',
  'Board Games',
  'Card Games',
  'Trivia',
  'Superlongwordthatshouldbreaktheui'
];
export default function Filters() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className={cn("flex flex-col h-full text-left items-start", !isCollapsed && "max-w-[160px]")}>
        <Button variant="ghost" className='' onClick={toggleCollapse} >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!isCollapsed && <span className='ml-2'>Hide</span>}
        </Button>
        <div className="pl-5 block">
          <h1 className={`text-md text-left mt-4 font-bold tracking-wider md:text-xl ${isCollapsed ? 'hidden' : ''}`}>
            Filters
          </h1>
          {!isCollapsed && (
            <>
              <FilterItems listName="Platforms" list={Platforms} />
              <FilterItems listName="Genres" list={Genres} />
            </>
          )}
        </div>
      </div>
    </>
  );
}