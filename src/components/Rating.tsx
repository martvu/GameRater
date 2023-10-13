
interface RatingProps {
  rating: number
  numRatings?: number
}


export default function Rating({ rating, numRatings }: RatingProps) {
  return (
    <>
      {/*        <!-- Component: Basic Rating --> */}
      <div className="flex flex-col items-center gap-2">

        {/*          <!-- Rating --> */}
        <BasicRating rating={rating} />
        {/*          <!-- Helper text --> */}
        <span className="text-xs leading-6 text-slate-400">
          based on {numRatings} user ratings
        </span>
      </div>
      {/*        <!-- End Basic Rating --> */}
    </>
  )
}



export function BasicRating({ rating }: RatingProps) {
  // Calculate the number of filled and empty stars based on the rating
  const filledStars = Math.floor(rating);
  //const emptyStars = 5 - filledStars;

  // Create an array to map the star icons
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`text-lg ${
        index < filledStars ? 'text-yellow-400' : 'text-slate-400'
      }`}
    >
      {index < filledStars ? '★' : '☆'} {/* Filled star or empty star */}
    </span>
  ));

  return (
    <span className="flex items-center gap-4 rounded text-sm text-slate-400">
      <span className="flex gap-1">{stars}</span>
      <span>{rating} out of 5</span>
    </span>
  );
}

