import { atom } from 'recoil';
import { GameSortInput, User } from '../gql/graphql';

const user = localStorage.getItem('user');
const defaultUser = {
  _id: '',
  username: '',
  favorites: [],
  reviews: [],
};

export const userState = atom<User>({
  key: 'userState',
  default: user ? JSON.parse(user) : defaultUser,
});

export const selectedPlatformsState = atom({
  key: 'selectedPlatformsState',
  default: [] as number[],
});

export const selectedGenresState = atom({
  key: 'selectedGenresState',
  default: [] as number[],
});

const currentPage = sessionStorage.getItem('gameListPage');
export const pageState = atom<number>({
  key: 'pageState',
  default: currentPage ? parseInt(currentPage, 10) : 1,
});

const sortBy = sessionStorage.getItem('selectedSortState');
export const defaultSortBy = {
  field: 'first_release_date',
  order: 'desc',
};

export const sortByState = atom<GameSortInput>({
  key: 'sortByState',
  default: sortBy ? JSON.parse(sortBy) : defaultSortBy,
});

// For search query to persist on details page after searching
export const searchQueryState = atom({
  key: 'searchQueryState',
  default: '',
});

// For genres that are availbale to filter by after searching
export const genresListState = atom({
  key: 'genresListState',
  default: [] as number[],
});

// For platforms that are availbale to filter by after searching
export const platformsListState = atom({
  key: 'platformsListState',
  default: [] as number[],
});

export const showFavoritesState = atom({
  key: 'showFavoritesState',
  default: false,
});

export const showReviewedGamesState = atom({
  key: 'showReviewedGamesState',
  default: false,
});
