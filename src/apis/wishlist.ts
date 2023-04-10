import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getWishList = async () => {
  const { data } = await instance.get(API_URLS.WISHLIST);
  return data;
};

export const postAddCart = async (params: {
  numberOfPeople: number;
  productId: number | undefined;
  productOptionId: number;
  singleRoomNumber: number;
}) => {
  const data = await instance.post(API_URLS.CART, params);
  return data;
};
