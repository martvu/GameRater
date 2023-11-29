import { useState } from 'react';
import { ChevronLeft, ListFilter } from 'lucide-react';
import FilterItems from './FilterItems';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { GET_FILTERS } from '@/lib/queries';
import { useQuery } from '@apollo/client';
import { Genre, Platform } from '@/gql/graphql';
import { useRecoilValue } from 'recoil';
import {
  genresListState,
  platformsListState,
  selectedGenresState,
  selectedPlatformsState,
} from '@/state/atoms';
import { ScrollArea } from './ui/scroll-area';

/**
 * Filters component
 * Displayed on large screens (non-mobile)
 */
export default function Filters() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const genreList = useRecoilValue(genresListState);
  const platformList = useRecoilValue(platformsListState);
  const selectedGenres = useRecoilValue(selectedGenresState);
  const selectedPlatforms = useRecoilValue(selectedPlatformsState);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const { data } = useQuery(GET_FILTERS);

  const preferredOrder = [
    'Nintendo Switch',
    'PC (Microsoft Windows)',
    'PlayStation 5',
    'Xbox Series X|S',
  ];

  // Custom sorting function to sort platforms by preferred order
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

  // Filter only platforms in platformList (when search limits platforms) or all platforms if platformList is empty
  const filteredPlatforms = sortedPlatforms.filter(platform => {
    if (platformList.length === 0) return true;
    return (
      platformList.includes(platform.id as number) ||
      selectedPlatforms.includes(platform.id as number)
    );
  });

  // Filter only genres in genreList or all genres if genreList is empty
  const filteredGenres = genresCopy.filter(genre => {
    if (genreList.length === 0) return true;
    return (
      genreList.includes(genre.id as number) ||
      selectedGenres.includes(genre.id as number)
    );
  });

  // Apply transition to the filter menu
  const filterContainerClasses = cn(
    'flex h-full flex-col items-start overflow-hidden text-left transition-all duration-300 ease-in-out',
    isCollapsed ? 'w-0' : 'w-[240px]' // Toggle between full width and collapsed state
  );

  return (
    <>
      <section className={filterContainerClasses}>
        <ScrollArea className="h-full pb-4 pr-2">
          <section className="pb-4 pl-5 md:pb-32">
            <h1
              className={`mt-4 text-left text-xl font-bold tracking-wider text-foreground ${
                isCollapsed ? 'hidden' : ''
              }`}
            >
              Filter By
            </h1>
            {!isCollapsed && data && (
              <>
                <FilterItems
                  filters={filteredPlatforms}
                  filterType="platforms"
                />
                <FilterItems filters={filteredGenres} filterType="genres" />
              </>
            )}
          </section>
        </ScrollArea>
      </section>
      <Button
        className="fixed bottom-8 left-8 z-50 m-1 hidden md:flex"
        variant="secondary"
        onClick={toggleCollapse}
        aria-label={isCollapsed ? 'show filters' : 'hide filters'}
      >
        {isCollapsed ? <ListFilter /> : <ChevronLeft size={18} />}
        {!isCollapsed && <span className="ml-2">Hide filters</span>}
      </Button>
    </>
  );
}
