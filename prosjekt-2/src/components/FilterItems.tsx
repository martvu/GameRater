import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';

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
      <div className="flex flex-col ml-1">
      {list.slice(0, numItemsToShow).map((item, index) => (
  <div className="flex items-center space-x-2 my-1" key={index}>
    <Checkbox id={`filter-item-${item}`} />
    <label
      htmlFor={`filter-item-${item}`}
      className="text-sm text-left font-light leading-none break-all peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {item}
    </label>
  </div>
))}
</div>
      {numItemsToShow < list.length ? (
        <Button
          variant={'text'}
          onClick={showMore}
          className="flex items-center w-36 pl-0 text-green-400"
        >
          <Plus className="inline-block h-6" />
          <span>Show More</span>
        </Button>
      ) : (
        <Button
          variant={'text'}
          onClick={showLess}
          className="flex items-center w-36 pl-0 text-red-400"
        >
          <Minus className="inline-block h-6" />
          <span>Show Less</span>
        </Button>
      )}
    </div>
  );
}


