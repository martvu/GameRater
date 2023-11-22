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
import { useQuery } from '@apollo/client';
import { gql } from '../gql/';
import Metascore from './Metascore';
import FavoriteHeart from './FavoriteHeart';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useState } from 'react';

interface GameCardProps {
  game: Game;
}

const GET_AVG_RATING = gql(`
  query GetAvgRating($gameID: ID!) {
    getAvgRating(gameID: $gameID)
  }
`);

export function GameCard({ game }: GameCardProps) {
  const [imageError, setImageError] = useState(false);
  const {
    _id: id,
    name,
    aggregated_rating: aggregatedRating,
    cover_image_id: imageId,
  } = game;
  const { data } = useQuery(GET_AVG_RATING, {
    variables: { gameID: id as string },
  });

  const rating = data?.getAvgRating;
  const coverImageUrl = imageId
    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`
    : ('' as string);

  return (
    <Card className="h-[310px] min-w-[175px] max-w-[262px] overflow-visible p-0 duration-300 hover:scale-105 sm:h-[410px] sm:min-w-[262px]">
      <Link
        data-testid="game-card-link"
        to={`/game/${id}`}
        aria-label={`Link to ${name} detail page`}
      >
        <CardHeader className="h-[235px] w-[176px] overflow-hidden rounded-t-lg sm:mb-2 sm:h-[320px] sm:w-[260px]">
          <div className="flex flex-1 items-center justify-center">
            {!imageError ? (
              <img
                src={coverImageUrl}
                alt={name as string}
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <img
                src={imageNotFound}
                alt="Image not found"
                className="object-cover"
              />
            )}
          </div>
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
      <CardFooter className="mt-auto h-[40px] w-full pl-3 pr-2 sm:pb-2">
        <div className="relative flex h-full w-full items-center">
          <div className="absolute left-0 flex items-center">
            <Star className="mr-1 h-5 fill-yellow-400 text-yellow-400" />
            <p>{rating === 0 ? '-' : rating}</p>
          </div>
          <div className="absolute right-10 flex items-center gap-2">
            <Metascore
              metascore={aggregatedRating ? aggregatedRating : undefined}
            />
          </div>
          <div className="absolute right-0">
            <FavoriteHeart game={game} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
