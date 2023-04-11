import { ICartAdd, ICartEditOption } from './../interfaces/cart';
import { ICart } from '@/interfaces/cart';
import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getCart = async () => {
  const { data } = await instance.get(API_URLS.CART);
  return data;
};

export const postCart = async (cartData: ICartAdd) => {
  const { data } = await instance.post(API_URLS.CART, cartData);
  return data;
};

export const patchCartOption = async (id: number, cartOption: ICartEditOption) => {
  const { data } = await instance.patch(API_URLS.CART_BY_ID(id), cartOption);
  return data;
};

export const deleteCart = async (cartId: number[]) => {
  const { data } = await instance.delete(API_URLS.CART, { data: cartId });
  return data;
};
