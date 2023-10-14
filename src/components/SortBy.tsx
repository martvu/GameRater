import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SortBy() {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            <SelectItem className="cursor-pointer" value="release date">
              Release Date
            </SelectItem>
            <SelectItem className="cursor-pointer" value="title">
              Title
            </SelectItem>
            <SelectItem className="cursor-pointer" value="rating">
              Rating
            </SelectItem>
            <SelectItem className="cursor-pointer" value="popularity">
              Popularity
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
