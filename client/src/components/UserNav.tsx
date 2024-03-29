import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { userState } from '@/state/atoms';
import { useRecoilState } from 'recoil';
import SignInModal from './SignInModal';
import { useToast } from './ui/use-toast';

/**
 * UserNav component
 * User navigation for displaying username and signing out
 */
export function UserNav() {
  const [user, setUser] = useRecoilState(userState);
  const { toast } = useToast();

  function signOutUser() {
    localStorage.removeItem('user');
    setUser({ _id: '', username: '', favorites: [], reviews: [] });
    toast({
      title: 'Signed out',
      description: 'You have been signed out.',
    });
  }

  const fallBackLogo = user.username?.charAt(0).toUpperCase();
  return user.username === '' ? (
    <SignInModal />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger data-testid="user-nav" asChild>
        <Button
          aria-label="User nav"
          variant="ghost"
          className="relative h-10 w-10 rounded-full"
        >
          <Avatar className="h-10 w-10 border-2">
            <AvatarFallback>{fallBackLogo}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 w-56" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col items-center gap-2">
            <UserCircle />
            <p className="text-sm font-medium leading-none">{user.username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOutUser}>
          <Button data-testid="sign-out-button" variant="none" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
