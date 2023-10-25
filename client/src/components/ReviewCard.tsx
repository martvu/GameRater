import { StarRating } from './Rating';
import { Card, CardDescription, CardHeader } from './ui/card';

interface Review {
  id?: string;
  author: string;
  title: string;
  content: string;
  rating: number;
  platform: number;
  gameID: string;
}
interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard(review: ReviewCardProps) {
  return (
    <div className='min-w-full'>
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{review.review.title}</p>
                <p className="text-sm text-muted-foreground">
                  {review.review.platform}
                </p>
              </div>
            </div>
          </div>
          <StarRating rating={review.review.rating} disabled={true} />
        </CardHeader>
        <CardDescription className="flex flex-row items-center gap-2">
          {review.review.content}
        </CardDescription>
      </Card>
    </div>
  );
}
