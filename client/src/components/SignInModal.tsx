import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { SignIn } from './SignIn';

export default function SignInModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <SignIn />
      </DialogContent>
    </Dialog>
  );
}
