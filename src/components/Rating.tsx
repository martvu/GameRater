import { useState } from 'react';

interface RatingProps {
  rating: number;
  numRatings?: number;
  disabled?: boolean;
  onChange?: (rating: number) => void;
}

export default function Rating({ rating, numRatings }: RatingProps) {
  return (
    <>
      {/*        <!-- Component: Basic Rating --> */}
      <div className="flex flex-col items-center gap-2">
        {/*          <!-- Rating --> */}
        <StarRating rating={rating} disabled={true}/>
        {/*          <!-- Helper text --> */}
        <span className="text-xs leading-6 text-muted-foreground">
          based on {numRatings} user ratings
        </span>
      </div>
      {/*        <!-- End Basic Rating --> */}
    </>
  );
}


export const StarRating = ({rating, disabled, onChange}: RatingProps) => {
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
  }
  return (
    <>
      <div className="flex items-center font-light">
        {[...Array(5)].map((_star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={(
                index <= (hover || ratingValue)
                  ? 'text-yellow-400'
                  : 'text-muted-foreground'
          )}
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
                {index <= rating ? '★' : '☆'} {/* Filled star or empty star */}{' '}
              </span>
            </button>
          );
        })}
        <span className='text-muted-foreground ml-2'>{rating}/5</span>
      </div>
      
    </>
  );
};

