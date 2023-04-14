import { ICart } from '@/interfaces/cart';
import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getCart = async () => {
  const { data } = await instance.get(API_URLS.CART);
  return data;
};

export const addCart = async (cartData: ICart) => {
  const { data } = await instance.post(API_URLS.CART, cartData);
  return data;
};

export const editCartOption = async (id: number) => {
  const { data } = await instance.patch(API_URLS.CART_BY_ID(id));
  return data;
};

export const deleteCart = async (cartId: Array<{ cartId: number }>) => {
  const { data } = await instance.delete(API_URLS.CART);
  return data;
};
