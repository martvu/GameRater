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

interface GameCardProps {
  game: Game;
}

const GET_AVG_RATING = gql(`
  query GetAvgRating($gameID: ID!) {
    getAvgRating(gameID: $gameID)
  }
`);

export function GameCard({ game }: GameCardProps) {
  const {
    _id: id,
    name,
    aggregated_rating: aggregatedRating,
    cover_image_id: imageId,
  } = game;
  const { data } = useQuery(GET_AVG_RATING, {
    variables: { gameID: id as string },
  });

  const handleImageError = (e) => {
    e.target.src = imageNotFound; // Set the source to your fallback image
  };
  const rating = data?.getAvgRating;
  const coverImageUrl = imageId
    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`
    : ('' as string);

  return (
    <Card className="relative h-[310px] min-w-[175px] max-w-[260px] p-0 duration-300 overflow-hidden hover:scale-105 sm:h-[410px] sm:min-w-[260px]">
      <Link to={`/game/${id}`} aria-label={`Link to ${name} detail page`}>
        <CardHeader className="mb-2 h-[240px] w-[175px] overflow-hidden sm:h-[320px] sm:w-[260px]">
          <div className="flex flex-1 items-center justify-center">
            {imageId && (
              <img
                src={coverImageUrl}
                alt={name as string}
                className="object-cover fill-green-300"
                onError={handleImageError}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="relative px-3 text-start">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CardTitle className="my-1 line-clamp-1 max-w-[150px] py-1 text-sm duration-300 hover:opacity-50 sm:max-w-[240px] sm:text-lg ">
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
      <CardFooter className="absolute bottom-0 left-0 mt-auto h-[40px] w-full px-3 pb-2">
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
