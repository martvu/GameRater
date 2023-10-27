import { StarRating } from './Rating';
import { Card, CardDescription, CardHeader } from './ui/card';

interface Review {
  id?: string;
  user: string;
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
    <Card>
      <CardHeader>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{review.review.title}</p>
          <p className="text-sm text-muted-foreground">
            {review.review.platform}
          </p>
        </div>
        <StarRating rating={review.review.rating} disabled={true} />
      </CardHeader>
      <CardDescription className="flex max-w-[800px] flex-row items-center gap-2">
        {review.review.content}
      </CardDescription>
    </Card>
  );
}
