import withLayout from '@/lib/withLayout';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Review } from '@/gql/graphql';
import { useRecoilValue } from 'recoil';
import { userState } from '@/state/atoms';
import Loading from '@/components/Loading';
import { GET_GAME } from '@/lib/queries.tsx';
import { GameDetails } from '@/components/GameDetails.tsx';
import { GameReviews } from '@/components/GameReviews.tsx';

type GameDetailParams = {
  id: string;
};

const BaseGameDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<GameDetailParams>();
  const reviewsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const user = useRecoilValue(userState);
  const { loading, error, data } = useQuery(GET_GAME, {
    variables: {
      id: id as string,
      limit: reviewsPerPage,
      offset: (currentPage - 1) * reviewsPerPage,
      username: user?.username,
    },
  });

  // Scroll to top of the page on mount because of the router optimizations
  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0);
  });

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  // Check if the game data exists
  if (!data?.getGame) {
    return <div>Game not found</div>;
  }

  return (
    <section className="flex justify-center pt-4">
      <div className="max-w-96 flex flex-col gap-4 px-4">
        {/* Back button */}
        <Button
          aria-label="Back to previous page"
          size="icon"
          variant="ghost"
          className="rounded-2x flex-shrink-0"
          onClick={() => {
            if (location.key !== 'default') {
              navigate(-1);
            } else {
              navigate('/', { replace: true });
            }
          }}
        >
          <ArrowLeft />
        </Button>
        {/* Game details */}
        <GameDetails game={data.getGame} />
        {/* Reviews */}
        <GameReviews
          reviews={data.getGame.reviews?.reviews as Review[]}
          count={data.getGame.reviews?.count as number}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          reviewsPerPage={reviewsPerPage}
        />
      </div>
    </section>
  );
};

const GameDetailPage = withLayout(BaseGameDetailPage);
export default GameDetailPage;
