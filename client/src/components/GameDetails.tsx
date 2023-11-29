import { formatDate } from '@/lib/utils.ts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card.tsx';
import ProgressiveImage from '@/components/ProgressiveImage.tsx';
import imageNotFound from '@/assets/img-fallback.svg';
import Rating from '@/components/Rating.tsx';
import { Button } from '@/components/ui/button.tsx';
import ReviewModal from '@/components/ReviewModal.tsx';
import FavoriteHeart from '@/components/FavoriteHeart.tsx';
import Metascore from '@/components/Metascore.tsx';
import { Genre, GetGameQuery, Platform } from '@/gql/graphql.ts';
import { Badge } from '@/components/ui/badge.tsx';

type GameDetailsProps = {
  game: GetGameQuery['getGame'];
};
export const GameDetails = ({ game }: GameDetailsProps) => {
  const hasWrittenReview = game.reviews?.userHasReviewed || false;
  const releaseDate = formatDate(game.first_release_date as string);
  return (
    <div className="flex flex-row flex-wrap justify-center gap-8">
      <section className="flex flex-row gap-2">
        {/* Image, ratings, Write Review */}
        <section className="flex flex-row items-center justify-center gap-4">
          <Card className="w-auto overflow-hidden p-0">
            <CardHeader className="h-[364px] w-[264px] p-0">
              <div className="absolute right-2 top-2"></div>
              <ProgressiveImage
                fullSrc={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.imageId}.jpg`}
                placeholderSrc={imageNotFound}
                alt={game.name as string}
                className="h-full w-full object-cover" // Adjust the width and height as needed
              />
            </CardHeader>
            <CardContent className="pt-0">
              <div className=" flex items-center justify-center text-yellow-400">
                <Rating
                  rating={game.user_rating || 0}
                  numRatings={game.reviews?.count || 0}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col justify-center">
              {hasWrittenReview ? (
                <Button className="mb-4 w-[200px]" disabled>
                  Review Submitted
                </Button>
              ) : (
                <ReviewModal />
              )}
            </CardFooter>
          </Card>
        </section>
      </section>
      {/* Title, Release Date, Platforms, Genres and Description */}
      <section className="border-none bg-transparent pb-4 text-left md:min-w-[400px] md:max-w-[700px] lg:min-w-[500px]">
        <h1 className=" flex gap-4 text-4xl font-semibold">
          {game.name}
          <FavoriteHeart variant="secondary" game={game} />
        </h1>

        <section className="flex flex-col justify-start gap-1">
          {game.aggregatedRating ? (
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">Metascore: </p>
              <Metascore
                metascore={
                  game.aggregatedRating ? game.aggregatedRating : undefined
                }
              />
            </div>
          ) : null}
          <div className="mt-1 flex items-center gap-2">
            <p className="text-muted-foreground">Release Date:</p>
            <p className="text-sm font-semibold">{releaseDate}</p>
          </div>
          <div className="mt-1 flex flex-row gap-2">
            <p className="mr-2 text-muted-foreground">Platforms:</p>
            <ul className="flex flex-row flex-wrap">
              {game.platforms?.map((platform: Platform | null) => (
                <li className="mb-1 mr-1 list-none" key={platform?.name}>
                  <Badge variant="secondary">
                    <span className="line-clamp-1">{platform?.name}</span>
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-1 flex flex-row gap-2">
            <p className="mr-2 text-muted-foreground">Genres:</p>
            <ul className="flex flex-row flex-wrap">
              {game.genres?.map((genre: Genre | null) => (
                <li className="mb-1 mr-1 list-none" key={genre?.name}>
                  <Badge variant="secondary">{genre?.name}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-1 text-muted-foreground">{game.summary}</p>
        </section>
      </section>
    </div>
  );
};
