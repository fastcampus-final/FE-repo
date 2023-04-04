import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getAdminProduct = async () => {
  const { data } = await instance.get(API_URLS.ADMIN.PRODUCT);
  return data;
};

export const getAdminProductDetail = async (id: string) => {
  const { data } = await instance.get(API_URLS.ADMIN.PRODUCT_DETAIL(id));
  return data;
};
