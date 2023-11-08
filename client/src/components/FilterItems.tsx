import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { useRecoilState } from 'recoil';
import { selectedGenresState, selectedPlatformsState } from '@/state/atoms.ts';
import { Genre, Platform } from '@/gql/graphql';

interface FilterItemsProps {
  filters: Platform[] | Genre[];
  filterType: 'platforms' | 'genres';
}

export default function FilterItems({ filters, filterType }: FilterItemsProps) {
  const [numItemsToShow, setNumItemsToShow] = useState(10);
  const [selectedPlatforms, setSelectedPlatforms] = useRecoilState(
    selectedPlatformsState
  );
  const [selectedGenres, setSelectedGenres] =
    useRecoilState(selectedGenresState);

  const showMore = () => {
    setNumItemsToShow(numItemsToShow + 10);
  };

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
  };

  const showLess = () => setNumItemsToShow(10);

  return (
    <div>
      <h2 className="my-2 text-left font-semibold capitalize">{filterType}</h2>
      <div className="ml-1 flex flex-col">
        {filters?.slice(0, numItemsToShow).map(item => (
          <div className="my-1 flex items-center space-x-2" key={item?.name}>
            <Checkbox
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
            <label
              htmlFor={`filter-item-${item?.name}`}
              className="break-all text-left text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item?.name}
              {/* {item?.gamesCount && ` (${item?.gamesCount})`} */}
            </label>
          </div>
        ))}
      </div>
      {filters && numItemsToShow < filters.length ? (
        <Button
          variant={'text'}
          onClick={showMore}
          className="flex w-36 items-center pl-0 text-green-400"
        >
          <Plus className="inline-block h-6" />
          <span>Show More</span>
        </Button>
      ) : numItemsToShow > 10 ? (
        <Button
          variant={'text'}
          onClick={showLess}
          className="flex w-36 items-center pl-0 text-red-400"
        >
          <Minus className="inline-block h-6" />
          <span>Show Less</span>
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
