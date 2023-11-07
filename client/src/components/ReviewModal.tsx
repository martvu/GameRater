import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ReviewForm } from './ReviewForm';
import { userState } from '@/state/userState';
import { useRecoilState } from 'recoil';
import SignInModal from './SignInModal';

export default function ReviewModal() {
  const [user] = useRecoilState(userState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4 w-[200px]">Write Review</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        {user.username === '' ? (
          <div className="flex flex-col items-center space-y-2">
            <p>You need to sign in to review the game!</p>
            <SignInModal />
          </div>
        ) : (
          <ReviewForm />
        )}
      </DialogContent>
    </Dialog>
  );
}
