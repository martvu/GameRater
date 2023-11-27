import withLayout from '@/lib/withLayout';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Rating from '@/components/Rating';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ReviewCard from '@/components/ReviewCard';
import ReviewModal from '@/components/ReviewModal';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Pagination from '@/components/Pagination';
import { Genre, Platform, Review } from '@/gql/graphql';
import Metascore from '@/components/Metascore';
import FavoriteHeart from '@/components/FavoriteHeart';
import { useRecoilValue } from 'recoil';
import { userState } from '@/state/atoms';
import Loading from '@/components/Loading';
import { Badge } from '@/components/ui/badge';
import ProgressiveImage from '@/components/ProgressiveImage';
import imageNotFound from '@/assets/img-fallback.svg';
import { GET_GAME } from '@/lib/queries.tsx';

type GameDetailParams = {
  id: string;
};

const BaseGameDetailPage = () => {
  const { id } = useParams<GameDetailParams>();
  const user = useRecoilValue(userState);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_GAME, {
    variables: {
      id: id as string,
      limit: reviewsPerPage,
      offset: (currentPage - 1) * reviewsPerPage,
      username: user?.username,
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  // Check if the game data exists
  if (!data?.getGame) {
    return <div>Game not found</div>;
  }

  const formatDate = (unixTimestampStr: string): string => {
    const date = new Date(Number(unixTimestampStr) * 1000);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const hasWrittenReview = data?.getGame.reviews?.userHasReviewed || false;
  const releaseDate = formatDate(data?.getGame?.first_release_date as string);

  return (
    <div className="flex justify-center pt-20">
      {/* Back button */}
      <div className="grid max-w-[1200px] grid-cols-1 gap-4 px-4">
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

        <main className="grid gap-2 md:grid-cols-[auto,1fr]">
          {/* Image, ratings, Write Review */}
          <section className="flex flex-col items-center justify-center gap-4">
            <Card className="w-auto overflow-hidden p-0">
              <CardHeader className="h-[364px] w-[264px] p-0">
                <div className="absolute right-2 top-2"></div>
                <ProgressiveImage
                  fullSrc={`https://images.igdb.com/igdb/image/upload/t_cover_big/${data.getGame.imageId}.jpg`}
                  placeholderSrc={imageNotFound}
                  alt={data.getGame.name as string}
                  className="h-full w-full object-cover" // Adjust the width and height as needed
                />
              </CardHeader>
              <CardContent className="pt-0">
                <div className=" flex items-center justify-center text-yellow-400">
                  <Rating
                    rating={data.getGame.user_rating || 0}
                    numRatings={data.getGame.reviews?.count || 0}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col justify-center">
                {hasWrittenReview ? (
                  <Button className="mb-4 w-[200px]" disabled>
                    Review Submitted
                  </Button>
                ) : (
                  <ReviewModal />
                )}
              </CardFooter>
            </Card>
          </section>

          {/* Title, Release Date, Platforms, Genres and Description */}
          <Card className="border-none bg-transparent pb-4 text-left md:min-w-[400px] md:max-w-[700px] lg:min-w-[500px]">
            <CardHeader className="flex flex-col items-start">
              <CardTitle className=" flex gap-4 text-4xl font-semibold">
                {data.getGame.name}
                <FavoriteHeart variant="secondary" game={data.getGame} />
              </CardTitle>
              <CardContent className="py-2">
                <div className="flex flex-col justify-start gap-1">
                  {data.getGame.aggregatedRating ? (
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground">Metascore: </p>
                      <Metascore
                        metascore={
                          data.getGame.aggregatedRating
                            ? data.getGame.aggregatedRating
                            : undefined
                        }
                      />
                    </div>
                  ) : null}
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-muted-foreground">Release Date:</p>
                    <p className="text-sm font-semibold">{releaseDate}</p>
                  </div>
                  <div className="mt-1 flex flex-row flex-wrap">
                    <p className="mr-2 text-muted-foreground">Platforms:</p>
                    {data.getGame.platforms?.map(
                      (platform: Platform | null) => (
                        <li
                          className="mb-1 mr-1 list-none"
                          key={platform?.name}
                        >
                          <Badge variant="secondary">{platform?.name}</Badge>
                        </li>
                      )
                    )}
                  </div>
                  <div className="mt-1 flex flex-row flex-wrap">
                    <p className="mr-2 text-muted-foreground">Genres:</p>
                    {data.getGame.genres?.map((genre: Genre | null) => (
                      <li className="mb-1 mr-1 list-none" key={genre?.name}>
                        <Badge variant="secondary">{genre?.name}</Badge>
                      </li>
                    ))}
                  </div>
                </div>
              </CardContent>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-md">{data.getGame.summary}</p>
            </CardContent>
          </Card>

          {/* Reviews */}
          <div className="col-span-1 mt-10 flex h-full w-full lg:col-span-2">
            <div className="flex min-w-full flex-col justify-center text-left lg:min-w-[700px]">
              <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
              {data.getGame.reviews?.reviews?.length !== 0 ? (
                data.getGame.reviews?.reviews?.map((review: Review | null) => (
                  <div key={review?._id} className="my-2">
                    <ReviewCard review={review as Review} />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-foreground">No reviews yet</p>
                </div>
              )}
            </div>
          </div>
        </main>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={
            Math.ceil((data.getGame.reviews?.count || 1) / reviewsPerPage) || 1
          }
        />
      </div>
    </div>
  );
};

const GameDetailPage = withLayout(BaseGameDetailPage);
export default GameDetailPage;
