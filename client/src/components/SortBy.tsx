import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sortByState } from '@/state/sortByState';
import { useRecoilState } from 'recoil';

export default function SortBy() {
  const setSortBy = useRecoilState(sortByState)[1];

  function handleSortSelection(value: string) {
    if (value === 'Release Date Desc') {
      setSortBy({ field: 'first_release_date', order: 'desc' });
    }
    if (value === 'Release Date Asc') {
      setSortBy({ field: 'first_release_date', order: 'asc' });
    }
    if (value === 'Name') {
      setSortBy({ field: 'name', order: 'asc' });
    }
    if (value === 'Metascore') {
      setSortBy({ field: 'aggregated_rating', order: 'desc' });
    }
    if (value === 'User Rating') {
      setSortBy({ field: 'user_rating', order: 'desc' });
    }
    console.log('Hello sort');
    // Store the selected value in localStorage
    localStorage.setItem('selectedSortBy', value);
  }

  return (
    <Select onValueChange={value => handleSortSelection(value)}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Sort By">
          {localStorage.getItem('selectedSortBy') === ''
            ? 'Sort By'
            : localStorage.getItem('selectedSortBy')}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem value="Release Date Desc">Release Date Desc</SelectItem>
          <SelectItem value="Release Date Asc">Release Date Asc</SelectItem>
          <SelectItem value="Name">Name</SelectItem>
          <SelectItem value="Metascore">Metascore</SelectItem>
          <SelectItem value="User Rating">User Rating</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
