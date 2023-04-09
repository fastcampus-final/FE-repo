import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getCart = async () => {
  const { data } = await instance.get(API_URLS.CART);
  return data;
};
