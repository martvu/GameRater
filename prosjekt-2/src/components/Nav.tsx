import { ModeToggle } from '@/components/theme/ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Nav() {
  return (
    <nav className="flex h-24 w-full items-center justify-between mx-4">
      <div className="flex w-28 items-center justify-between">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="logo" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-green-600 font-semibold text-xl">GameRater</h1>
      </div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
}
