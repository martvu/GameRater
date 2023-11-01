import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { useQuery } from '@apollo/client';
import { gql } from '../gql/';
const GET_FILTERS = gql(`
  query GetFilters {
    getPlatforms {
      name
    }
    getGenres {
      name
    }
  }
`);

interface FilterItemsProps {
  filterType: string;
}

export default function FilterItems({ filterType }: FilterItemsProps) {
  const { loading, error, data } = useQuery(GET_FILTERS);
  const [numItemsToShow, setNumItemsToShow] = useState(10);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const filterData =
    filterType === 'platforms' ? data?.getPlatforms : data?.getGenres;
  const showMore = () => {
    setNumItemsToShow(numItemsToShow + 5);
  };
  const showLess = () => setNumItemsToShow(5); // Reset to showing 5 items
  return (
    <div>
      <h2 className="my-2 text-left font-semibold"></h2>
      <div className="ml-1 flex flex-col">
        {filterData?.slice(0, numItemsToShow).map(item => (
          <div className="my-1 flex items-center space-x-2" key={item.name}>
            <Checkbox id={`filter-item-${item.name}`} />
            <label
              htmlFor={`filter-item-${item.name}`}
              className="break-all text-left text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.name}
            </label>
          </div>
        ))}
      </div>
      {data?.getPlatforms && numItemsToShow < data.getPlatforms.length ? (
        <Button
          variant={'text'}
          onClick={showMore}
          className="flex w-36 items-center pl-0 text-green-400"
        >
          <Plus className="inline-block h-6" />
          <span>Show More</span>
        </Button>
      ) : (
        <Button
          variant={'text'}
          onClick={showLess}
          className="flex w-36 items-center pl-0 text-red-400"
        >
          <Minus className="inline-block h-6" />
          <span>Show Less</span>
        </Button>
      )}
    </div>
  );
}
