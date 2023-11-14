import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import FilterItems from './FilterItems';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { gql } from '@/gql';
import { useQuery } from '@apollo/client';
import Loading from './Loading';
import { Genre, Platform } from '@/gql/graphql';
import { useRecoilValue } from 'recoil';
import {
  genresListState,
  platformsListState,
  selectedGenresState,
  selectedPlatformsState,
} from '@/state/atoms';

const GET_FILTERS = gql(`
  query GetFilters {
    getGenres {
        id
        name
        gamesCount
    }
    getPlatforms {
        id
        name
        gamesCount
    }
  }
`);

export default function Filters() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const genreList = useRecoilValue(genresListState);
  const platformList = useRecoilValue(platformsListState);
  const selectedGenres = useRecoilValue(selectedGenresState);
  const selectedPlatforms = useRecoilValue(selectedPlatformsState);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const { data, loading, error } = useQuery(GET_FILTERS);

  // Define the preferred platforms order
  const preferredOrder = [
    'Nintendo Switch',
    'PC (Microsoft Windows)',
    'PlayStation 5',
    'Xbox Series X|S',
  ];

  // Custom sorting function
  const sortByPreference = (a: Platform, b: Platform) => {
    const aIndex = preferredOrder.indexOf(a.name as string);
    const bIndex = preferredOrder.indexOf(b.name as string);

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex; // Both are preferred, sort by preferred order
    } else if (aIndex !== -1) {
      return -1; // Only a is preferred
    } else if (bIndex !== -1) {
      return 1; // Only b is preferred
    }
    return 0; // Neither is preferred, maintain original order
  };

  // Sort the platforms
  // Create a copy of the platforms array before sorting
  const platformsCopy: Platform[] = [...(data?.getPlatforms ?? [])];
  const genresCopy: Genre[] = [...(data?.getGenres ?? [])];
  // Now sort the copied array
  const sortedPlatforms: Platform[] = platformsCopy.sort(sortByPreference);

  // Filter only platforms in platformList
  const filteredPlatforms = sortedPlatforms.filter(platform => {
    if (platformList.length === 0) return true;
    return (
      platformList.includes(platform.id as number) ||
      selectedPlatforms.includes(platform.id as number)
    );
  });

  const filteredGenres = genresCopy.filter(genre => {
    if (genreList.length === 0) return true;
    return (
      genreList.includes(genre.id as number) ||
      selectedGenres.includes(genre.id as number)
    );
  });

  if (loading) {
    return (
      <div className="h-screen w-[210px]">
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <div
        className={cn(
          'flex h-full min-h-screen flex-col items-start overflow-y-auto text-left',
          !isCollapsed && 'w-[210px]'
        )}
      >
        <Button
          className="m-1 hidden md:flex"
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
          {!isCollapsed && data && (
            <>
              <FilterItems filters={filteredPlatforms} filterType="platforms" />
              <FilterItems filters={filteredGenres} filterType="genres" />
            </>
          )}
        </div>
      </div>
    </>
  );
}
