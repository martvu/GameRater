import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  gamesPerPage: number;
  gameData: unknown[];
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  gamesPerPage,
  gameData,
}: PaginationProps) {
  const totalPages = Math.ceil(gameData.length / gamesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      {/*<!-- Component: Minimal basic pagination with icons and text --> */}
      <nav role="navigation" aria-label="Pagination Navigation">
        <ul className="flex list-none items-center justify-center text-sm md:gap-1">
          <li>
            <Button
              variant="ghost"
              onClick={prevPage}
              aria-label="Goto Prev Page"
              disabled={currentPage === 1}
            >
              <span className="order-2">Prev</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </li>

          <li>
            <Button
              variant="ghost"
              onClick={nextPage}
              aria-label="Goto Next Page"
              disabled={currentPage === totalPages}
            >
              <span>Next </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </li>
        </ul>
      </nav>
      {/*<!-- End Minimal basic pagination with icons and text --> */}
    </>
  );
}
