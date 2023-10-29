import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react'; // Make sure to install lucide-react if you haven't
import FilterItems from './FilterItems';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useQuery, gql } from '@apollo/client';

const GET_FILTERS = gql`
  query GetPlatforms {
    getPlatforms {
      name
    }
  }
`;
export const Platforms = [
  'PC',
  'PS4',
  'PS5',
  'Xbox One',
  'Xbox Series S/X',
  'Nintendo Switch',
  'Mobile',
]; 

/* const Genres = [
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
  'Superlongwordthatshouldbreaktheui',
]; */
export default function Filters() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { loading, error, data } = useQuery(GET_FILTERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div
        className={cn(
          'flex h-full flex-col items-start text-left min-h-screen max-h-[800px] overflow-y-auto',
          !isCollapsed && 'max-w-[210px]'
        )}
      >
        <Button
          className="hidden md:flex"
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
              <FilterItems filterType="platforms" />
              <FilterItems filterType="genres" />
            </>
          )}
        </div>
      </div>
    </>
  );
}
