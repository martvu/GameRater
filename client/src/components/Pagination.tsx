import { Button } from './ui/button';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  pages: number;
  storageKey: 'gameListPage' | 'reviewPage';
}

/**
 * Pagination component
 * @param {number} currentPage - The current page
 * @param {function} setCurrentPage - Callback function when page is changed
 * @param {number} pages - The total number of pages
 */
export default function Pagination({
  currentPage,
  setCurrentPage,
  pages,
  storageKey,
}: PaginationProps) {
  interface PageButtonProps {
    pageNumber: number;
  }

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
    // Save page number to session storage, only for GameListPage
    if (storageKey === 'gameListPage') {
      sessionStorage.setItem(storageKey, pageNumber.toString());
    }
  }

  const PageButton = ({ pageNumber }: PageButtonProps) => {
    const isActive = currentPage === pageNumber;
    return (
      <Button
        variant={isActive ? 'outline' : 'ghost'}
        className="border-primary"
        size="page"
        onClick={() => handlePageChange(pageNumber)}
        aria-label={`go to page ${pageNumber}`}
      >
        {pageNumber}
      </Button>
    );
  };

  if (pages > 1)
    return (
      <nav aria-label="pagination" className="flex flex-wrap justify-center">
        <Button
          size="page"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          variant="ghost"
          aria-label="go to previous page"
        >
          «
        </Button>
        {pages <= 7 ? (
          Array<number>(pages)
            .fill(1)
            .map((_, index) => {
              return <PageButton pageNumber={index + 1} key={index} />;
            })
        ) : currentPage <= 4 ? (
          <>
            <PageButton pageNumber={1} />
            <PageButton pageNumber={2} />
            <PageButton pageNumber={3} />
            <PageButton pageNumber={4} />
            <PageButton pageNumber={5} />
            <Button
              size="page"
              variant="ghost"
              disabled
              aria-label="more pages"
            >
              ...
            </Button>
            <PageButton pageNumber={pages} />
          </>
        ) : currentPage >= pages - 3 ? (
          <>
            <PageButton pageNumber={1} />
            <Button
              size="page"
              variant="ghost"
              disabled
              aria-label="more pages"
            >
              ...
            </Button>
            <PageButton pageNumber={pages - 4} />
            <PageButton pageNumber={pages - 3} />
            <PageButton pageNumber={pages - 2} />
            <PageButton pageNumber={pages - 1} />
            <PageButton pageNumber={pages} />
          </>
        ) : (
          <>
            <PageButton pageNumber={1} />
            <Button
              size="page"
              variant="ghost"
              disabled
              aria-label="more pages"
            >
              ...
            </Button>
            <PageButton pageNumber={currentPage - 1} />
            <PageButton pageNumber={currentPage} />
            <PageButton pageNumber={currentPage + 1} />
            <Button
              size="page"
              variant="ghost"
              disabled
              aria-label="more pages"
            >
              ...
            </Button>
            <PageButton pageNumber={pages} />
          </>
        )}
        <Button
          size="page"
          disabled={currentPage === pages}
          onClick={() => handlePageChange(currentPage + 1)}
          variant="ghost"
          aria-label="go to next page"
        >
          »
        </Button>
      </nav>
    );
}
