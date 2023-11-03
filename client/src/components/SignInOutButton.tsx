import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '@/state/atoms.ts';
import SignInModal from '@/components/SignInModal.tsx';
import { Button } from '@/components/ui/button.tsx';

export function SignInOutButton() {

  const [user] = useRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);

  function signOutUser() {
    localStorage.removeItem('user');
    resetUserState();
  }

  return (
    user.username === '' ?
      <SignInModal />
      :
      <div className='flex items-center gap-3'>
        <h1>{user.username}</h1>
        <Button onClick={signOutUser}>Sign Out</Button>
      </div>
  );
}
