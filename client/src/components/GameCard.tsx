import { Star } from 'lucide-react';

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

  const rating = data?.getAvgRating;
  const coverImageUrl = imageId
    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`
    : ('' as string);

  return (
    <Card className="relative h-[400px] min-w-[240px] max-w-[300px] overflow-hidden p-0">
      <CardHeader className="h-[320px] overflow-hidden">
        <div className="min-h-[320px] w-full duration-700 hover:scale-105">
          {imageId && <img src={coverImageUrl} alt={name as string} className='object-cover' />}
        </div>
      </CardHeader>
      <CardContent className="relative px-3 text-start">
        <Link to={`/game/${id}`} aria-label={`Link to ${name} detail page`}>
          <CardTitle className="py-1 my-1 line-clamp-1 max-w-[240px] text-lg hover:opacity-50 duration-300 ">
            {name}
          </CardTitle>
        </Link>
        
        
      </CardContent>
      <CardFooter className="absolute bottom-0 left-0 mt-auto h-[40px] w-full px-3 pb-2">
        <div className="relative flex h-full w-full items-center">
          <div className="absolute left-0 flex items-center">
            <Star className="mr-1 h-5 text-yellow-400 fill-yellow-400" />
            <p>{rating === 0 ? '-' : rating}</p>
          </div>
          <div className="absolute right-10 flex items-center gap-2">
            <Metascore
              metascore={aggregatedRating ? aggregatedRating : undefined}
            />
          </div>
          <div className='absolute right-0'>
          <FavoriteHeart game={game} />
        </div>
        </div>
      </CardFooter>
    </Card>
  );
}
