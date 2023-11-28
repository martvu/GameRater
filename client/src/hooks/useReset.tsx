import { useSetRecoilState } from 'recoil';
import {
  defaultSortBy,
  pageState,
  searchQueryState,
  selectedGenresState,
  selectedPlatformsState,
  sortByState,
} from '@/state/atoms.ts';

const useReset = () => {
  const setSelectedPlatforms = useSetRecoilState(selectedPlatformsState);
  const setSelectedGenres = useSetRecoilState(selectedGenresState);
  const setSortBy = useSetRecoilState(sortByState);
  const setCurrentPage = useSetRecoilState(pageState);
  const setSearchQuery = useSetRecoilState(searchQueryState);

  function reset() {
    setSortBy(defaultSortBy);
    setCurrentPage(1);
    setSelectedPlatforms([]);
    setSelectedGenres([]);
    setSearchQuery('');
    sessionStorage.removeItem('selectedSortLabel');
    sessionStorage.setItem('selectedSortBy', '');
    sessionStorage.setItem('currentPage', '1');
    sessionStorage.removeItem('searchQuery');
  }

  return reset;
};

export default useReset;
