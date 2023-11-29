import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  genresListState,
  pageState,
  platformsListState,
  selectedGenresState,
  selectedPlatformsState,
  showFavoritesState,
  showReviewedGamesState,
  sortByState,
  userState,
} from '@/state/atoms.ts';

/**
 * useParameterState hook
 * Returns all the parameters for the games/search query
 */
const useParameterState = () => {
  const [currentPage, setCurrentPage] = useRecoilState(pageState);
  const [sortBy, setSortBy] = useRecoilState(sortByState);
  const selectedPlatforms = useRecoilValue(selectedPlatformsState);
  const selectedGenres = useRecoilValue(selectedGenresState);
  const user = useRecoilValue(userState);
  const showFavorites = useRecoilValue(showFavoritesState);
  const showReviewedGames = useRecoilValue(showReviewedGamesState);
  const setGenresList = useSetRecoilState(genresListState);
  const setPlatformsList = useSetRecoilState(platformsListState);

  return {
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    selectedPlatforms,
    selectedGenres,
    user,
    showFavorites,
    showReviewedGames,
    setGenresList,
    setPlatformsList,
  };
};

export default useParameterState;
