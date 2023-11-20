import { useRecoilState } from 'recoil';
import { userState } from '@/state/atoms';
import SignInModal from '@/components/SignInModal.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useToast } from '@/components/ui/use-toast.ts';

export function SignInOutButton() {
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

  return user.username === '' ? (
    <SignInModal />
  ) : (
    <div className="flex items-center gap-3">
      <h1>{user.username}</h1>
      <Button variant="outline" onClick={signOutUser}>
        Sign Out
      </Button>
    </div>
  );
}
