import { Review } from '@/gql/graphql.ts';
import ReviewCard from '@/components/ReviewCard.tsx';
import Pagination from '@/components/Pagination.tsx';

type GameReviewProps = {
  reviews: Review[];
  count?: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  reviewsPerPage: number;
};

export const GameReviews = ({
  reviews,
  count,
  reviewsPerPage,
  setCurrentPage,
  currentPage,
}: GameReviewProps) => {
  return (
    <>
      <section className="col-span-1 mt-10 flex h-full w-full flex-col md:col-span-2">
        <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
        <ul className="flex min-w-full flex-col justify-center text-left md:min-w-[700px]">
          {reviews?.length !== 0 ? (
            reviews?.map((review: Review | null) => (
              <li key={review?._id} className="my-2">
                <ReviewCard review={review as Review} />
              </li>
            ))
          ) : (
            <li className="flex flex-col items-center justify-center">
              <p className="text-foreground">No reviews yet</p>
            </li>
          )}
        </ul>
      </section>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={Math.ceil((count || 1) / reviewsPerPage) || 1}
      />
    </>
  );
};
