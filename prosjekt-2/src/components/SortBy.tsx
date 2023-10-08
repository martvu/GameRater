import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem value="apple">Release Date</SelectItem>
          <SelectItem value="banana">Title</SelectItem>
          <SelectItem value="blueberry">Rating</SelectItem>
          <SelectItem value="grapes">Popularity</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
