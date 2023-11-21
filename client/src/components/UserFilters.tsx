import { Button } from './ui/button';
import { Heart, Star } from 'lucide-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  pageState,
  showFavoritesState,
  showReviewedGamesState,
  userState,
} from '@/state/atoms';

export default function UserFilters() {
  const [currentPage, setCurrentPage] = useRecoilState(pageState);
  const user = useRecoilValue(userState);
  const [showFavorites, setShowFavorites] = useRecoilState(showFavoritesState);
  const [showReviewedGames, setShowReviewedGames] = useRecoilState(
    showReviewedGamesState
  );
  function handleShowFavorites() {
    setShowFavorites(!showFavorites);
    setCurrentPage(1);
  }

  function handleShowReviewedGames() {
    setShowReviewedGames(!showReviewedGames);
    setCurrentPage(1);
  }

  return (
    <div className="flex gap-2">
      {/* Show favorites and reviewed buttons if user is signed in */}
      {user._id && (
        <>
          <Button
            data-testid="toggle-favorites-btn"
            aria-label="Toggle favorites"
            className="flex gap-1"
            size="md"
            variant={showFavorites ? 'invert' : 'secondary'}
            onClick={handleShowFavorites}
          >
            <p className="hidden sm:block">Favorites</p>
            <Heart
              size={16}
              className={`${showFavorites ? 'fill-red-500 text-red-500' : ''}`}
            />
          </Button>
          <Button
            aria-label="Toggle reviewed games"
            className="flex gap-1"
            size="md"
            variant={showReviewedGames ? 'invert' : 'secondary'}
            onClick={handleShowReviewedGames}
          >
            <p className="hidden sm:block">Reviewed</p>
            <Star
              size={16}
              className={`${
                showReviewedGames ? 'fill-yellow-400 text-yellow-500' : ''
              }`}
            />
          </Button>
        </>
      )}
    </div>
  );
}
