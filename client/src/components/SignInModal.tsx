import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { SignInForm } from './SignInForm';

export default function SignInModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="modal-sign-in-button">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] overflow-auto">
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}
