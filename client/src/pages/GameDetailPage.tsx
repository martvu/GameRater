import withLayout from '@/lib/withLayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams, Link } from 'react-router-dom';
import { reviews } from '@/components/GameData';
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

const GetGame = gql`
  query GetGame($id: ID!) {
    getGame(ID: $id) {
      _id
      name 
      summary
      cover_image_id
      first_release_date
    }
  }
`;
type GameDetailParams = {
  id: string;
};

const BaseGameDetailPage = () => {
  const { id } = useParams<GameDetailParams>();
  const { loading, error, data } = useQuery(GetGame, {
    variables: { id: id },
  });

  console.log(id)
  const [reviewData, setReviewData] = useState(reviews);
  const [hasMore, setHasMore] = useState(true);


  // Check if the game data exists
  if (!data?.getGame) {
    return <div>Game not found</div>;
  }

  // Fetch more data
  const fetchData = () => {
    if (reviewData.length >= 20) {
      setHasMore(false);
      return;
    }
    // Replace with your data fetching logic
    setTimeout(() => {
      const mockData = getMoreMockData(); // Replace with your data fetching logic
      if (mockData.length > 0) {
        // Add the fetched data to the reviews state
        setReviewData(prevReviews => [...prevReviews, ...mockData]);
      } else {
        // No more data available
        setHasMore(false);
      }
    }, 1000);
  };

  const getMoreMockData = () => {
    // Replace this with your data fetching logic
    // For simplicity, we'll simulate adding more items to the mock data
    const newData = Array.from({ length: 5 }, (_, index) => ({
      id: reviewData.length + index + 1, // Unique ID
      rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
      title: `Review ${reviewData.length + index + 1}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    }));
    return newData;
  };

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
                    {/* {game.platforms?.map(platform => (
                      <li
                        className="mr-1 list-none rounded-lg border border-primary px-2 text-sm"
                        key={platform}
                      >
                        {platform}
                      </li>
                    ))}
                  </div>
                  <div className="mt-1 flex flex-row flex-wrap">
                    <p className="mr-2">Genres:</p>
                    {game.genres?.map(genre => (
                      <li
                        className="mr-1 list-none rounded-lg border border-primary px-2 text-sm"
                        key={genre}
                      >
                        {genre}
                      </li>
                    ))} */}
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
          <div className="flex justify-center col-span-1 h-full w-full md:col-span-2">
            <InfiniteScroll
              dataLength={reviewData.length}
              next={fetchData}
              hasMore={hasMore} // Replace with a condition based on your data source
              loader={<p>Loading...</p>}
              endMessage={<p>No more data to load.</p>}
            >
              <div className="w-full text-left">
                <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
                {reviewData.map(data => (
                  <div key={data.id} className="my-2 max-w-[800px]">
                    <ReviewCard review={data} />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameDetailPage = withLayout(BaseGameDetailPage);
export default GameDetailPage;
