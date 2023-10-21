import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ReviewForm } from './ReviewForm';

export default function ReviewModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4 w-[200px]">Write Review</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <ReviewForm />
      </DialogContent>
    </Dialog>
  );
}
