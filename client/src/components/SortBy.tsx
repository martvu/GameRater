import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { pageState } from '@/state/atoms';
import { sortByState } from '@/state/atoms';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

export default function SortBy() {
  const setSortBy = useRecoilState(sortByState)[1];
  const setCurrentPage = useSetRecoilState(pageState);
  const [selectOpen, setOpen] = useState(false);

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

    // Store the selected value in sessionStorage
    sessionStorage.setItem('selectedSortBy', JSON.stringify(sortByObject));
    sessionStorage.setItem('selectedSortLabel', value);

    // Reset the page to 1
    setCurrentPage(1);
    sessionStorage.setItem('currentPage', '1');
  }

  return (
    // Need a setTimout to prevent the select from clicking through on touch devices
    <Select
      open={selectOpen}
      onOpenChange={() => {
        setTimeout(() => {
          setOpen(!selectOpen);
        }, 1);
      }}
      onValueChange={value => handleSortSelection(value)}
      value={sessionStorage.getItem('selectedSortLabel') || ''}
    >
      <SelectTrigger
        data-testid="sort-by-select"
        className="w-[150px] hover:bg-accent"
      >
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem data-testid="release-date-desc" value="Release Date Desc">Release Date Desc</SelectItem>
          <SelectItem data-testid="release-date-asc" value="Release Date Asc">Release Date Asc</SelectItem>
          <SelectItem data-testid="a-z" value="Name A-Z">Name A-Z</SelectItem>
          <SelectItem data-testid="z-a" value="Name Z-A">Name Z-A</SelectItem>
          <SelectItem data-testid="metascore" value="Metascore">Metascore</SelectItem>
          <SelectItem data-testid="user-rating" value="User Rating">User Rating</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
