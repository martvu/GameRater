import withLayout from '@/lib/withLayout';
import Botw from '../assets/botw.jpeg';
import { useParams, Link } from 'react-router-dom';
import { reviews, Data, gameData } from '@/components/GameData';
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

type GameDetailParams = {
  id: string;
};

const BaseGameDetailPage = () => {
  const { id } = useParams<GameDetailParams>();
  const index = id ? parseInt(id, 10) : NaN;
  const game: Data = gameData[index];

  // Check if the game data exists
  if (!game) {
    return <div>Game not found</div>;
  }

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
          <Card className="overflow-hidden p-0">
            <CardHeader className="p-0">
              <div className="flex w-full cursor-default p-0">
                <img
                  src={game.image || Botw}
                  alt={game.title}
                  className="h-full max-h-[300px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-2 flex items-center justify-center text-yellow-400">
                <Rating rating={game.rating} numRatings={41} />
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col justify-center">
              <ReviewModal />
            </CardFooter>
          </Card>

          {/* Title, Release Date, Platforms, Genres and Description */}
          <Card className="pb-4 text-left lg:w-[600px]">
            <CardHeader className="flex flex-col items-start">
              <CardTitle className=" text-4xl font-semibold">
                {game.title}
              </CardTitle>
              <CardContent className="py-2">
                <div className="flex flex-col justify-start">
                  <div className="flex">
                    <p>Release Date: 12.12.2017 </p>
                  </div>
                  <div className="mt-1 flex flex-row flex-wrap">
                    <p className="mr-2">Platforms:</p>
                    {game.platforms?.map(platform => (
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
                    ))}
                  </div>
                </div>
              </CardContent>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-md text-muted-foreground">
                {game.description}
              </p>
            </CardContent>
          </Card>
          {/* Reviews */}
          <div className="col-span-1 flex w-full flex-col justify-center text-left lg:w-[500px]">
            <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
            {reviews.map(data => (
              <div key={data.id} className="my-1">
                <ReviewCard review={data} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GameDetailPage = withLayout(BaseGameDetailPage);
export default GameDetailPage;
