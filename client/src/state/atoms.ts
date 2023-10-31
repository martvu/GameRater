import { atom } from 'recoil';

const user = localStorage.getItem('user');
const defaultUser = {
  _id: '',
  username: '',
  favorites: [],
  reviews: [],
};

export const userState = atom({
  key: 'userState',
  default: user ? JSON.parse(user) : defaultUser,
});
