import { ModeToggle } from '@/components/theme/ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Nav() {
  return (
    <nav className="relative flex h-24 w-full items-center justify-between">
      <div className="flex w-28 items-center justify-between gap-2 px-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="logo" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-green-600 font-semibold text-xl">GameRater</h1>
      </div>
      <div className="hidden w-full max-w-sm items-center space-x-2 md:flex">
        <Input type="input" placeholder="Search" />
        <Button type="submit">Search</Button>
      </div>
      <ModeToggle />
    </nav>
  );
}
