import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { SignInForm } from './SignInForm';
import { useState } from 'react';

interface SignInModalProps {
  onSignInSuccess?: () => void;
}

/**
 * SignInModal component
 * @param {function} onSignInSuccess - Callback function when user signs in
 */
export default function SignInModal({ onSignInSuccess }: SignInModalProps) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
    if (onSignInSuccess) {
      onSignInSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="modal-sign-in-button" variant="outline">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] overflow-auto">
        <SignInForm onClose={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
