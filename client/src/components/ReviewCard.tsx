import { Review } from '@/gql/graphql';
import { StarRating } from './Rating';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

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
      <CardHeader className="flex flex-col">
        <CardTitle className="text-lg font-semibold">
          {review.review.title}
        </CardTitle>
        <h4 className="text-sm text-muted-foreground">{review.review.user}</h4>
        <h4 className="text-sm text-muted-foreground">
          {review.review.platform}
        </h4>
        <StarRating rating={review.review.rating as number} disabled={true} />
      </CardHeader>
      <CardDescription className="break-all pt-4">
        {review.review.content}
      </CardDescription>
    </Card>
  );
}
