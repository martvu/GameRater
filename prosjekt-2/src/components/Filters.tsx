import { Button } from './ui/button';

export default function Filters() {
  return (
    <>
      <div className="hidden h-full min-w-[280px] max-w-[280px] border border-solid md:block">
        Filters
      </div>
      <div className="block w-full md:hidden">
        <Button variant="outline" className="rounded-xl">
          Filters
        </Button>
      </div>
    </>
  );
}
