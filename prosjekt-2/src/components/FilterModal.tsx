import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import Filters from './Filters';

export default function FilterModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[150px]">
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Filters />
        <DialogFooter>
          <Button type="submit">Apply Filter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
