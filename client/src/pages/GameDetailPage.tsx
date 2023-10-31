import withLayout from '@/lib/withLayout';
import { useParams, Link } from 'react-router-dom';
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
import { useQuery, gql } from '@apollo/client';
import Pagination from '@/components/Pagination';

const GET_GAME = gql`
  query GetGame($id: ID!, $limit: Int!) {
    getGame(ID: $id) {
      _id
      name
      summary
      cover_image_id
      first_release_date
      platforms {
        name
      }
      genres {
        name
      }
      reviews(limit: $limit) {
        _id
        title
        content
        rating
        platform
        gameID
        user
      }
    }
  }
`;
type GameDetailParams = {
  id: string;
};

const BaseGameDetailPage = () => {
  const { id } = useParams<GameDetailParams>();
  const { loading, error, data } = useQuery(GET_GAME, {
    variables: { id: id, limit: 100 },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  // Check if the game data exists
  if (!data?.getGame) {
    return <div>Game not found</div>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="flex justify-center">
      {/* Back to home button*/}
      <div className="grid max-w-[1500px] grid-cols-1 gap-4 px-4">
        <Link to="/" className="w-10" aria-label="back to home">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-2x flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        </Link>
        <div className="grid gap-2 lg:grid-cols-[auto,1fr]">
          {/* Image, ratings, Write Review */}
          <Card className="overflow-hidden p-0 md:min-w-[400px] lg:min-w-[500px]">
            <CardHeader className="p-0">
              <div className="flex w-full cursor-default p-0">
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${data.getGame.cover_image_id}.jpg`}
                  alt={data.getGame.name}
                  className="h-full max-h-[300px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-2 flex items-center justify-center text-yellow-400">
                <Rating rating={3} numRatings={41} />
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col justify-center">
              <ReviewModal />
            </CardFooter>
          </Card>

          {/* Title, Release Date, Platforms, Genres and Description */}
          <Card className="pb-4 text-left md:min-w-[400px] lg:min-w-[500px]">
            <CardHeader className="flex flex-col items-start">
              <CardTitle className=" text-4xl font-semibold">
                {data.getGame.name}
              </CardTitle>
              <CardContent className="py-2">
                <div className="flex flex-col justify-start">
                  <div className="flex">
                    <p>Release Date: 12.12.2017 </p>
                  </div>
                  <div className="mt-1 flex flex-row flex-wrap">
                    <p className="mr-2">Platforms:</p>
                    {data.getGame.platforms?.map(platform => (
                      <li
                        className="mr-1 list-none rounded-lg border border-primary px-2 text-sm"
                        key={platform.name}
                      >
                        {platform.name}
                      </li>
                    ))}
                  </div>
                  <div className="mt-1 flex flex-row flex-wrap">
                    <p className="mr-2">Genres:</p>
                    {data.getGame.genres?.map(genre => (
                      <li
                        className="mr-1 list-none rounded-lg border border-primary px-2 text-sm"
                        key={genre.name}
                      >
                        {genre.name}
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
              {data.getGame.reviews.length !== 0 ? (
                data.getGame.reviews
                  .slice(
                    (currentPage - 1) * reviewsPerPage,
                    currentPage * reviewsPerPage
                  )
                  .map(review => (
                    <div key={review._id} className="my-2">
                      <ReviewCard review={review} />
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
          itemsPerPage={reviewsPerPage}
          data={data.getGame.reviews}
        />
      </div>
    </div>
  );
};

const GameDetailPage = withLayout(BaseGameDetailPage);
export default GameDetailPage;
