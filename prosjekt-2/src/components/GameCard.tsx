import { Star } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  rating: number;
}

export function GameCard({ title, description, image, rating }: GameCardProps) {
  return (
    <Card className="relative h-[300px] w-[240px] overflow-hidden">
      <CardHeader className="h-4/7 overflow-hidden p-0">
        <div className="h-full w-full duration-200 hover:scale-110">
          <img src={image} alt={title} />
        </div>
      </CardHeader>
      <CardContent className='text-start px-3'>
        <CardTitle className='text-xl my-2'>{title}</CardTitle>
        <CardDescription className='line-clamp-3'>{description}</CardDescription>
      </CardContent>
      <CardFooter className="absolute px-3 bottom-0 mt-auto left-0">
        <div className='flex items-center'>
          <Star className='text-yellow-400 mr-1 h-4' fill='#facc15'/>
          <p>
            {rating}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
