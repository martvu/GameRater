import { Review } from '@/gql/graphql';
import { StarRating } from './Rating';
import { Card, CardDescription, CardHeader } from './ui/card';

interface ReviewCardProps {
  review: Review;
}

/**
 * ReviewCard component
 * @param {Review} review - The review object
 */
export default function ReviewCard(review: ReviewCardProps) {
  return (
    <Card className="max-w-full">
      <CardHeader>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{review.review.title}</p>
          <p className="text-sm text-muted-foreground">{review.review.user}</p>
          <p className="text-sm text-muted-foreground">
            {review.review.platform}
          </p>
        </div>
        <StarRating rating={review.review.rating as number} disabled={true} />
      </CardHeader>
      <CardDescription className="break-all pt-4">
        {review.review.content}
      </CardDescription>
    </Card>
  );
}
