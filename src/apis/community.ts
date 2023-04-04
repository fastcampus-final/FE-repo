import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getBoardList = async (type: string, pageNumber: number) => {
  const { data } = await instance.get(API_URLS.BOARD(type, pageNumber));
  return data;
};

export const getBoardSearchList = async (type: string, pageNumber: number) => {
  const { data } = await instance.get(API_URLS.BOARD_SEARCH(type, pageNumber));
  return data;
};
