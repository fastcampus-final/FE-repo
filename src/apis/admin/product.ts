import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getAdminProduct = async (page: number) => {
  const { data } = await instance.get(API_URLS.ADMIN.PRODUCT_PAGE(page));
  return data;
};

export const getAdminProductDetail = async (id: string) => {
  const { data } = await instance.get(API_URLS.ADMIN.PRODUCT_DETAIL(id));
  return data;
};

export const addAdminProduct = async (data: object) => {
  await instance.post(API_URLS.ADMIN.PRODUCT, data);
};

export const editProduct = async (id: string) => {
  await instance.patch(API_URLS.ADMIN.PRODUCT_BY_ID(id));
};

export const deleteProduct = async (id: string) => {
  await instance.delete(API_URLS.ADMIN.PRODUCT_BY_ID(id));
};
