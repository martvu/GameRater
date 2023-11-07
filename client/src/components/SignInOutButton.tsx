import { useRecoilState } from 'recoil';
import { userState } from '@/state/userState';
import SignInModal from '@/components/SignInModal.tsx';
import { Button } from '@/components/ui/button.tsx';

export function SignInOutButton() {
  const [user, setUser] = useRecoilState(userState);

  function signOutUser() {
    setUser({ _id: '', username: '', favorites: [], reviews: [] });
    localStorage.removeItem('user');
    console.log('User signed out');
  }

  return user.username === '' ? (
    <SignInModal />
  ) : (
    <div className="flex items-center gap-3">
      <h1>{user.username}</h1>
      <Button onClick={signOutUser}>Sign Out</Button>
    </div>
  );
}
