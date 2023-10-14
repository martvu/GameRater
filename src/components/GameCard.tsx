import { Star } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface GameCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
}

export function GameCard({
  id,
  title,
  description,
  image,
  rating,
}: GameCardProps) {
  return (
    <Card className="relative h-[320px] min-w-[240px] max-w-[300px] overflow-hidden p-0">
      <CardHeader className="h-4/7 overflow-hidden">
        <div className="h-full w-full duration-200 hover:scale-110">
          <img src={image} alt={title} />
        </div>
      </CardHeader>
      <CardContent className="px-3 text-start">
        <Link to={`/game/${id}`}>
          <CardTitle className="my-2 text-xl">{title}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
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
