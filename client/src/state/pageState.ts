import { atom } from 'recoil';

const currentPage = localStorage.getItem('currentPage');
const defaultPage = 1;

export const pageState = atom<number>({
  key: 'pageState',
  default: currentPage ? parseInt(currentPage, 10) : defaultPage,
});