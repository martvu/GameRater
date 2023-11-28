import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import Filters from './Filters';

/**
 * FilterModal component
 * Displayed on small screens (mobile devices)
 */
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
          <DialogClose asChild>
            <Button type="submit">Apply Filter</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
