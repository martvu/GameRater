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

const currentPage = localStorage.getItem('currentPage');
export const pageState = atom<number>({
  key: 'pageState',
  default: currentPage ? parseInt(currentPage, 10) : 1,
});

const sortBy = localStorage.getItem('selectedSortState');

export const defaultSortBy = {
  field: 'first_release_date',
  order: 'desc',
};

export const sortByState = atom<GameSortInput>({
  key: 'sortByState',
  default: sortBy ? JSON.parse(sortBy) : defaultSortBy,
});

