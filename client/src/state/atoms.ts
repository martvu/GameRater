import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    _id: '',
    username: '',
    favorites: [],
    reviews: [],
  },
});
