import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem className="cursor-pointer"value="apple">Release Date</SelectItem>
          <SelectItem className="cursor-pointer"value="banana">Title</SelectItem>
          <SelectItem className="cursor-pointer"value="blueberry">Rating</SelectItem>
          <SelectItem className="cursor-pointer"value="grapes">Popularity</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
