import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getAdminProductCategory = async () => {
  const { data } = await instance.get(API_URLS.ADMIN.CATEGORY);
  return data;
};

export const getAdminProductCategoryDetail = async (id: number) => {
  const { data } = await instance.get(API_URLS.ADMIN.CATEGORY_BY_ID(id));
  return data;
};

export const postAdminProductCategory = async (data: object) => {
  await instance.post(API_URLS.ADMIN.CATEGORY, data);
};

export const patchProductCategory = async (id: number) => {
  await instance.patch(API_URLS.ADMIN.CATEGORY_BY_ID(id));
};

export const deleteProductCategory = async (id: number) => {
  await instance.delete(API_URLS.ADMIN.CATEGORY_BY_ID(id));
};
