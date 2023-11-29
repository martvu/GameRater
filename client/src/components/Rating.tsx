import { useState } from 'react';

interface RatingProps {
  rating: number;
  numRatings?: number;
  disabled?: boolean;
  onChange?: (rating: number) => void;
}

/**
 * Rating component
 * Star rating component that displays the rating and number of ratings
 * @param {number} rating - The rating of the game
 * @param {number} [numRatings] - The number of ratings
 */
export default function Rating({ rating, numRatings }: RatingProps) {
  return (
    <>
      <div className="flex flex-col items-center">
        <StarRating rating={rating} disabled={true} />
        <span className="text-xs leading-6 text-muted-foreground">
          Based on {numRatings} user {numRatings === 1 ? 'rating' : 'ratings'}
        </span>
      </div>
    </>
  );
}

/**
 * StarRating component
 * Show stars and rating value, can be disabled or used for giving ratings
 * @param {number} rating - The rating of the game
 * @param {boolean} [disabled] - Whether the rating is disabled
 * @param {function} [onChange] - Callback function when rating is changed
 */
export const StarRating = ({ rating, disabled, onChange }: RatingProps) => {
  const [ratingValue, setRatingValue] = useState(rating || 0);
  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    if (disabled) {
      return;
    }
    if (onChange) {
      onChange(value);
    }
    setRatingValue(value);
  };
  return (
    <>
      <div
        aria-label={`${rating} out of 5 stars`}
        className="flex items-center font-light"
      >
        {[...Array(5)].map((_star, index) => {
          index += 1;
          return (
            <button
              data-testid="review-star"
              aria-label={`review-star-${index}`}
              type="button"
              key={index}
              className={
                index <= (hover || ratingValue)
                  ? 'text-red-400'
                  : 'text-muted-foreground'
              }
              onClick={() => handleClick(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(ratingValue)}
              onDoubleClick={() => {
                setRatingValue(0);
                setHover(0);
              }}
              disabled={disabled}
            >
              <span className="text-2xl font-light">
                {index <= ratingValue ? '★' : '☆'}{' '}
                {/* Filled star or empty star */}{' '}
              </span>
            </button>
          );
        })}
        <span className="ml-2 text-muted-foreground">{ratingValue}/5</span>
      </div>
    </>
  );
};
