import { atom } from 'recoil';
import { GameSortInput } from '../gql/graphql';

const sortBy = localStorage.getItem('selectedSortState');

export const defaultSortBy = {
  field: 'first_release_date',
  order: 'desc',
};

export const sortByState = atom<GameSortInput>({
  key: 'sortByState',
  default: sortBy ? JSON.parse(sortBy) : defaultSortBy,
});
