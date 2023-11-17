import withLayout from '@/lib/withLayout';
import { useParams, useNavigate } from 'react-router-dom';
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
import { gql } from '../gql/';
import Metascore from '@/components/Metascore';
import FavoriteHeart from '@/components/FavoriteHeart';
import { useRecoilValue } from 'recoil';
import { userState } from '@/state/atoms';
import Loading from '@/components/Loading';

export const GET_GAME = gql(`
  query GetGame($id: ID!, $limit: Int!, $offset: Int!) {
    getAvgRating(gameID: $id)
    getGame(ID: $id) {
      _id
      name
      summary
      imageId: cover_image_id
      first_release_date
      aggregatedRating: aggregated_rating
      platforms {
        name
      }
      genres {
        name
      }
      reviews(limit: $limit, offset: $offset) {
        count
        reviews {
          _id
          user
          title
          content
          rating
          platform
          gameID
        }
      }
    }
  }
`);

type GameDetailParams = {
  id: string;
};

const BaseGameDetailPage = () => {
  const { id } = useParams<GameDetailParams>();
  const user = useRecoilValue(userState);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_GAME, {
    variables: {
      id: id as string,
      limit: reviewsPerPage,
      offset: (currentPage - 1) * reviewsPerPage,
    },
  });

  const rating = Number(data?.getAvgRating);
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

  const hasWrittenReview = data?.getGame.reviews?.reviews?.some(
    (review: Review | null) => review?.user === user.username
  );
  const releaseDate = formatDate(data?.getGame?.first_release_date as string);

  return (
    <div className="flex justify-center">
      {/* Back to home button*/}
      <div className="grid max-w-[1200px] grid-cols-1 gap-4 px-4">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-2x flex-shrink-0"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </Button>

        <div className="grid gap-2 md:grid-cols-[auto,1fr]">
          {/* Image, ratings, Write Review */}
          <Card className="overflow-hidden p-0">
            <CardHeader className="p-0">
              <div className="flex w-full cursor-default p-0">
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${data.getGame.imageId}.jpg`}
                  alt={data.getGame.name as string}
                  className="h-full max-h-[374px] w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="mt-2 flex items-center justify-center text-yellow-400">
                <Rating
                  rating={rating}
                  numRatings={data.getGame.reviews?.count || 0}
                />
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col justify-center">
              {hasWrittenReview ? (
                <Button className="mb-4 w-[200px]" disabled={true}>
                  Review Submitted
                </Button>
              ) : (
                <ReviewModal />
              )}
            </CardFooter>
          </Card>

          {/* Title, Release Date, Platforms, Genres and Description */}
          <Card className="pb-4 text-left md:min-w-[400px] lg:min-w-[500px]">
            <CardHeader className="flex flex-col items-start">
              <CardTitle className=" text-4xl font-semibold">
                {data.getGame.name}
              </CardTitle>
              <FavoriteHeart game={data.getGame} />
              <CardContent className="py-2">
                <div className="flex flex-col justify-start gap-1">
                  <div className="flex gap-2">
                    <p>Metascore: </p>
                    <Metascore
                      metascore={
                        data.getGame.aggregatedRating
                          ? data.getGame.aggregatedRating
                          : undefined
                      }
                    />
                  </div>
                  <div className="flex">
                    <p>Release Date: {releaseDate}</p>
                  </div>
                  <div className="mt-1 flex flex-row flex-wrap">
                    <p className="mr-2">Platforms:</p>
                    {data.getGame.platforms?.map(
                      (platform: Platform | null) => (
                        <li
                          className="mr-1 list-none rounded-lg border border-primary px-2 text-sm"
                          key={platform?.name}
                        >
                          {platform?.name}
                        </li>
                      )
                    )}
                  </div>
                  <div className="mt-1 flex flex-row flex-wrap">
                    <p className="mr-2">Genres:</p>
                    {data.getGame.genres?.map((genre: Genre | null) => (
                      <li
                        className="mr-1 list-none rounded-lg border border-primary px-2 text-sm"
                        key={genre?.name}
                      >
                        {genre?.name}
                      </li>
                    ))}
                  </div>
                </div>
              </CardContent>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-md text-muted-foreground">
                {data.getGame.summary}
              </p>
            </CardContent>
          </Card>
          {/* Reviews */}
          <div className="col-span-1 flex h-full w-full justify-center lg:col-span-2">
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
        </div>
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
