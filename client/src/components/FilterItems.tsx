import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  pageState,
  selectedGenresState,
  selectedPlatformsState,
} from '@/state/atoms.ts';
import { Genre, Platform } from '@/gql/graphql';
import { Label } from './ui/label';

interface FilterItemsProps {
  filters: Platform[] | Genre[];
  filterType: 'platforms' | 'genres';
}

/**
 * FilterItems component
 * @param {Platform[] | Genre[]} filters - The list of filters
 * @param {string} filterType - The type of filter ('platforms' or 'genres')
 */
export default function FilterItems({ filters, filterType }: FilterItemsProps) {
  const [numItemsToShow, setNumItemsToShow] = useState(10);
  const [selectedPlatforms, setSelectedPlatforms] = useRecoilState(
    selectedPlatformsState
  );
  const [selectedGenres, setSelectedGenres] =
    useRecoilState(selectedGenresState);
  const setCurrentPage = useSetRecoilState(pageState);

  const handleCheckboxChange = (filterId: number, isChecked: boolean) => {
    if (filterType === 'platforms') {
      setSelectedPlatforms(
        isChecked
          ? [...selectedPlatforms, filterId]
          : selectedPlatforms.filter(id => id !== filterId)
      );
    } else {
      setSelectedGenres(
        isChecked
          ? [...selectedGenres, filterId]
          : selectedGenres.filter(id => id !== filterId)
      );
    }
    setCurrentPage(1); // Reset page to 1 when a filter is selected
  };

  const showMore = () => {
    setNumItemsToShow(filters.length);
  };
  const showLess = () => setNumItemsToShow(10);
  return (
    <>
      <h3 className="my-2 text-left font-semibold capitalize text-foreground">
        {filterType}
      </h3>
      <ul className="ml-1 flex flex-col">
        {filters?.slice(0, numItemsToShow).map(item => (
          <li className="my-1 flex items-center space-x-2" key={item?.name}>
            <Checkbox
              aria-label={`${filterType} filter for ${item?.name}`}
              data-testid={`filter-item-${item?.name}`}
              id={`filter-item-${item?.name}`}
              onCheckedChange={checked => {
                if (typeof item?.id === 'number')
                  handleCheckboxChange(item.id, checked.valueOf() as boolean);
              }}
              checked={
                filterType === 'platforms'
                  ? selectedPlatforms.includes(item?.id ?? 0)
                  : selectedGenres.includes(item?.id ?? 0)
              }
            />
            <Label
              htmlFor={`filter-item-${item?.name}`}
              className={`line-clamp-1 text-left font-normal tracking-tight ${
                (filterType === 'platforms' &&
                  selectedPlatforms.includes(item?.id ?? 0)) ||
                (filterType === 'genres' &&
                  selectedGenres.includes(item?.id ?? 0))
                  ? 'font-semibold text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {item?.name}
              {/* {item?.gamesCount && ` (${item?.gamesCount})`} */}
            </Label>
          </li>
        ))}
      </ul>
      {filters && numItemsToShow < filters.length ? (
        <Button
          aria-label="show more filters"
          variant={'text'}
          onClick={showMore}
          className="flex w-36 items-center pl-0 text-primary"
        >
          <Plus className="inline-block h-6" />
          Show More
        </Button>
      ) : numItemsToShow > 10 && filters.length > 10 ? (
        <Button
          aria-label="show less filters"
          variant={'text'}
          onClick={showLess}
          className="flex w-36 items-center pl-0 text-red-700"
        >
          <Minus className="inline-block h-6" />
          Show Less
        </Button>
      ) : null}
    </>
  );
}
