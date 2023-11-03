import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortByProps = {
  onSort: (field: string, order: string) => void;
};

export default function SortBy({ onSort }: SortByProps) {
  function handleSortSelection(sortBy: string) {
    if (sortBy === 'release date asc') {
      onSort('first_release_date', 'asc');
    }
    if (sortBy === 'release date desc') {
      onSort('first_release_date', 'desc');
    }
    if (sortBy === 'name') {
      onSort('name', 'asc');
    }
    if (sortBy === 'metascore') {
      onSort('aggregated_rating', 'desc');
    }
    if (sortBy === 'user_rating') {
      onSort('user_rating', 'desc');
    }
    console.log('Hello sort');
    // Store the selected value in localStorage
    localStorage.setItem('selectedSortBy', sortBy);
  }

  return (
    <Select onValueChange={sortBy => handleSortSelection(sortBy)}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem className="cursor-pointer" value="release date asc">
            Release Date (ASC)
          </SelectItem>
          <SelectItem className="cursor-pointer" value="release date desc">
            Release Date (DESC)
          </SelectItem>
          <SelectItem className="cursor-pointer" value="name">
            Title
          </SelectItem>
          <SelectItem className="cursor-pointer" value="metascore">
            Metascore
          </SelectItem>
          <SelectItem className="cursor-pointer" value="user_rating">
            User Rating
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
