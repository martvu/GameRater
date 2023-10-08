import { ModeToggle } from '@/components/theme/ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Nav() {
  return (
    <nav className="flex w-full h-24 items-center justify-between ">
      
        <div className="flex w-28 items-center justify-between">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="logo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-green-600">GF Rater</h1>
        </div>
        <div>
          <ModeToggle />
        </div>
      
    </nav>
  );
}
