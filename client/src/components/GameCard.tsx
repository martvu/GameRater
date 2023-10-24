import { Star } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface GameCardProps {
  id: number;
  title: string;
  summary: string;
  image_id: string;
  rating: number;
}

export function GameCard({
  id,
  title,
  image_id,
  rating,
}: GameCardProps) {
  return (
    <Card className="relative h-[320px] min-w-[240px] max-w-[300px] overflow-hidden p-0">
      <CardHeader className="h-[220px] overflow-hidden">
        <div className="h-full w-full duration-200 hover:scale-110">
          <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${image_id}.jpg`} alt={title} />
        </div>
      </CardHeader>
      <CardContent className="px-3 text-start">
        <Link to={`/game/${id}`}>
          {' '}
          {/* Flytta link hit fordi SortBy trykker gjennom på mobil*/}
          <CardTitle className="my-2 text-xl">{title}</CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="absolute bottom-0 left-0 mt-auto px-3 pb-2">
        <div className="flex items-center">
          <Star className="mr-1 h-4 text-yellow-400" fill="#facc15" />
          <p>{rating}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
