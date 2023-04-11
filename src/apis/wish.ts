import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getWishList = async () => {
  const { data } = await instance.get(API_URLS.WISH);
  return data;
};

export const postWishList = async (params: { productId: number | undefined }) => {
  const { data } = await instance.post(API_URLS.WISH, params);
  return data;
};

export const deleteWishList = async (id: number) => {
  const { data } = await instance.delete(API_URLS.WISH_BY_ID(id));
  return data;
};
