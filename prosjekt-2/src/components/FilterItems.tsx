import { useState } from 'react';
import { HiMiniPlus, HiMiniMinus } from 'react-icons/hi2';
import { Checkbox } from './ui/checkbox';

interface Props {
  listName: string;
  list: string[];
}

export default function FilterItems({ listName, list }: Props) {
  const [numItemsToShow, setNumItemsToShow] = useState(5);

  const showMore = () => {
    setNumItemsToShow(numItemsToShow + 5);
  };
  const showLess = () => setNumItemsToShow(5); // Reset to showing 5 items
  return (
    <div>
      <h2 className="my-2 text-left font-semibold">{listName}</h2>
      <div className="flex flex-col">
        {list.slice(0, numItemsToShow).map(item => (
          <div className="flex items-center space-x-2 my-1">
          <Checkbox id="filter-item" />
          <label
            htmlFor="filter-item"
            className="text-sm text-left font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item}
          </label>
        </div>
        ))}
      </div>
      {numItemsToShow < list.length ? (
        <div
          onClick={showMore}
          className="w-36 cursor-pointer pl-0 text-green-400 hover:text-gray-400"
        >
          <HiMiniPlus className="inline-block h-6" />
          <span>Show More</span>
        </div>
      ) : (
        <div
          onClick={showLess}
          className="w-36 cursor-pointer pl-0 text-red-400 hover:text-gray-400"
        >
          <HiMiniMinus className="inline-block h-6" />
          <span>Show Less</span>
        </div>
      )}
    </div>
  );
}


