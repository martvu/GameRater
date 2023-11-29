import { Star } from 'lucide-react';
import imageNotFound from '@/assets/img-fallback.svg';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Game } from '@/gql/graphql';
import Metascore from './Metascore';
import FavoriteHeart from './FavoriteHeart';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import ProgressiveImage from './ProgressiveImage';

interface GameCardProps {
  game: Game;
}

/**
 * GameCard component
 * @param {Game} game - The game object
 */
export function GameCard({ game }: GameCardProps) {
  const {
    _id: id,
    name,
    aggregated_rating: aggregatedRating,
    cover_image_id: imageId,
    user_rating: userRating,
  } = game;
  const coverImageUrl = imageId
    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`
    : imageNotFound;

  return (
    <Card className="h-[310px] min-w-[175px] max-w-[262px] overflow-visible p-0 duration-300 hover:scale-105 sm:h-[410px] sm:min-w-[262px]">
      <Link
        data-testid="game-card-link"
        to={`/game/${id}`}
        aria-label={`Link to ${name} detail page`}
      >
        <CardHeader className="flex h-[235px] w-[176px] flex-1 items-center justify-center overflow-hidden rounded-t-lg sm:mb-2 sm:h-[320px] sm:w-[260px]">
          <ProgressiveImage
            placeholderSrc={imageNotFound} // imageNotFound is used for both placeholder and error state
            fullSrc={coverImageUrl}
            alt="Game cover image"
            className="h-full w-full object-cover" // Adjust the width and height as needed
          />
        </CardHeader>
        <CardContent className="relative px-3 text-start">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CardTitle className="line-clamp-1 max-w-[150px] py-1 text-sm duration-300 hover:opacity-50 sm:my-1 sm:max-w-[240px] sm:text-lg ">
                  {name}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs md:text-sm">{name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Link>
      <CardFooter className="relative mt-auto flex h-[40px] w-full items-center pl-3 pr-2 sm:pb-2">
        <div className="absolute left-2 flex items-center">
          <Star className="mr-1 h-5 fill-yellow-400 text-yellow-400" />
          <p>{userRating === 0 ? '-' : userRating}</p>
        </div>
        <div className="absolute right-1 flex items-center">
          <Metascore
            metascore={aggregatedRating ? aggregatedRating : undefined}
          />
          <FavoriteHeart game={game} />
        </div>
      </CardFooter>
    </Card>
  );
}
