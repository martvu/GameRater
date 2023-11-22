import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ReviewForm } from './ReviewForm';
import { userState } from '@/state/atoms';
import { useRecoilState } from 'recoil';
import SignInAlertModal from './SignInAlertModal';

export default function ReviewModal() {
  const [user] = useRecoilState(userState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="add-review-btn" className="mb-4 w-[200px]">
          Add Review
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        {user.username === '' ? (
          <SignInAlertModal message={'Please sign in to review this game!'} />
        ) : (
          <ReviewForm />
        )}
      </DialogContent>
    </Dialog>
  );
}
