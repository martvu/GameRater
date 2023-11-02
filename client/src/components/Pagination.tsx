import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  pages: number;
}
export default function Pagination({
  currentPage,
  setCurrentPage,
  pages
}: PaginationProps) {

  interface PageButtonProps {
    pageNumber: number;
  }


  const PageButton = ({ pageNumber }: PageButtonProps) => {
    const isActive = currentPage === pageNumber;
    return (
      <Button 
        variant={isActive ? "outline" : "ghost"} 
        className="border-primary"
        size="page" 
        onClick={() => setCurrentPage(pageNumber)}>
        {pageNumber}
      </Button>
    );
  };


  if (pages > 1)
    return (
      <div className="flex flex-wrap justify-center gap-4">
        <div className="join">
          <Button
            size="page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            variant="ghost"
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
              <Button size="page" variant="ghost" disabled>...</Button>
              <PageButton pageNumber={pages} />
            </>
          ) : currentPage >= pages - 3 ? (
            <>
              <PageButton pageNumber={1} />
              <Button size="page" variant="ghost" disabled>...</Button>
              <PageButton pageNumber={pages - 4} />
              <PageButton pageNumber={pages - 3} />
              <PageButton pageNumber={pages - 2} />
              <PageButton pageNumber={pages - 1} />
              <PageButton pageNumber={pages} />
            </>
          ) : (
            <>
              <PageButton pageNumber={1} />
              <Button size="page" variant="ghost" disabled>...</Button>
              <PageButton pageNumber={currentPage - 1} />
              <PageButton pageNumber={currentPage} />
              <PageButton pageNumber={currentPage + 1} />
              <Button size="page" variant="ghost" disabled>...</Button>
              <PageButton pageNumber={pages} />
            </>
          )}
          <Button
            size="page"
            disabled={currentPage === pages}
            onClick={() => setCurrentPage(currentPage + 1)}
            variant="ghost"
          >
            »
          </Button>
        </div>
      </div>
  );
}
