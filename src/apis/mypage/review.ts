import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getMyReviewList = async () => {
  const { data } = await instance.get(API_URLS.MYPAGE.REVIEW);
  return data;
};
