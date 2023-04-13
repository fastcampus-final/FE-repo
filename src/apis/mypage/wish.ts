import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getMyWishList = async () => {
  const { data } = await instance.get(API_URLS.WISH);
  return data;
};

export const deleteMyWish = async (id: number) => {
  await instance.delete(API_URLS.WISH_BY_ID(id));
};
