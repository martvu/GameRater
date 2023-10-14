import { StarRating } from './Rating';
import { Card, CardDescription, CardHeader } from './ui/card';

interface Review {
  title: string;
  description: string;
  rating: number;
}
interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard(review: ReviewCardProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{review.review.title}</p>
              </div>
            </div>
          </div>
          <StarRating rating={review.review.rating} disabled={true}/>
        </CardHeader>
        <CardDescription className="flex flex-row items-center gap-2">
            {review.review.description}
        </CardDescription>
      </Card>
    </div>
  );
}
