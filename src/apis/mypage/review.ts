import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getMyReviewList = async () => {
  const { data } = await instance.get(API_URLS.BOARD.REVIEW);
  return data;
};
