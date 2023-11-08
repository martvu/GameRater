import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { pageState } from '@/state/pageState';
import { sortByState } from '@/state/sortByState';
import { useRecoilState, useSetRecoilState } from 'recoil';

export default function SortBy() {
  const setSortBy = useRecoilState(sortByState)[1];
  const setCurrentPage = useSetRecoilState(pageState);

  function handleSortSelection(value: string) {
    let sortByObject = { field: 'first_release_date', order: 'desc' };
    if (value === 'Release Date Desc') {
      sortByObject = { field: 'first_release_date', order: 'desc' };
      setSortBy(sortByObject);
    }
    if (value === 'Release Date Asc') {
      sortByObject = { field: 'first_release_date', order: 'asc' };
      setSortBy(sortByObject);
    }
    if (value === 'Name A-Z') {
      sortByObject = { field: 'name', order: 'asc' };
      setSortBy(sortByObject);
    }
    if (value === 'Name Z-A') {
      sortByObject = { field: 'name', order: 'desc' };
      setSortBy(sortByObject);
    }
    if (value === 'Metascore') {
      sortByObject = { field: 'aggregated_rating', order: 'desc' };
      setSortBy(sortByObject);
    }
    if (value === 'User Rating') {
      sortByObject = { field: 'user_rating', order: 'desc' };
      setSortBy(sortByObject);
    }
    console.log('Hello sort');
    // Store the selected value in localStorage
    localStorage.setItem('selectedSortBy', JSON.stringify(sortByObject));
    localStorage.setItem('selectedSortLabel', value);

    // Reset the page to 1
    setCurrentPage(1);
    localStorage.setItem('currentPage', '1');
  }

  return (
    <Select
      onValueChange={value => handleSortSelection(value)}
      value={localStorage.getItem('selectedSortLabel') || ''}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem value="Release Date Desc">Release Date Desc</SelectItem>
          <SelectItem value="Release Date Asc">Release Date Asc</SelectItem>
          <SelectItem value="Name A-Z">Name A-Z</SelectItem>
          <SelectItem value="Name Z-A">Name Z-A</SelectItem>
          <SelectItem value="Metascore">Metascore</SelectItem>
          <SelectItem value="User Rating">User Rating</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}