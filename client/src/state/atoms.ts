import { atom } from 'recoil';
import { User } from '../gql/graphql';

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
