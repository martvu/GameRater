import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ReviewForm } from './ReviewForm';
import { userState } from '@/state/userState';
import { useRecoilState } from 'recoil';
import SignInAlertModal from './SignInAlertModal';

export default function ReviewModal() {
  const [user] = useRecoilState(userState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4 w-[200px]">Write Review</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        {user.username === '' ? (
          <SignInAlertModal message={"Please sign in to review this game!"}/>
        ) : (
          <ReviewForm />
        )}
      </DialogContent>
    </Dialog>
  );
}
