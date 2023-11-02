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
import { useQuery, gql } from '@apollo/client';
import Metascore from './Metascore';

interface GameCardProps {
  game: Game;
}

const GET_AVG_RATING = gql`
  query GetAvgRating($gameID: ID!) {
    getAvgRating(gameID: $gameID)
  }
`;
export function GameCard({ game }: GameCardProps) {
  const {
    _id: id,
    name,
    aggregated_rating: aggregatedRating,
    cover_image_id: imageId,
  } = game;
  const { data } = useQuery(GET_AVG_RATING, {
    variables: { gameID: id },
  });

  const rating = data?.getAvgRating;
  return (
    <Card className="relative h-[320px] min-w-[240px] max-w-[300px] overflow-hidden p-0">
      <CardHeader className="h-[220px] overflow-hidden">
        <div className="h-full w-full duration-200 hover:scale-110">
          {imageId && (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`}
              alt={name as string}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="px-3 text-start">
        <Link to={`/game/${id}`}>
          {' '}
          {/* Flytta link hit fordi SortBy trykker gjennom på mobil*/}
          <CardTitle className="my-2 line-clamp-2 max-w-[240px] text-lg">
            {name}
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="absolute bottom-0 left-0 mt-auto h-[40px] w-full px-3 pb-2">
        <div className="relative flex h-full w-full items-center">
          <div className="absolute left-0 flex items-center">
            <Star className="mr-1 h-4 text-yellow-400" fill="#facc15" />
            <p>{rating === 0 ? '-' : rating}</p>
          </div>
          <div className="absolute right-0 flex items-center gap-2">
            <Metascore
              metascore={aggregatedRating ? aggregatedRating : undefined}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
