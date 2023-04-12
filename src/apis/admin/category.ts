import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getAdminProductCategory = async () => {
  const { data } = await instance.get(API_URLS.CATEGORY);
  return data;
};

export const postAdminProductCategory = async (data: object) => {
  await instance.post(API_URLS.ADMIN.CATEGORY, data);
};

export const patchAdminProductCategory = async (id: number, data: object) => {
  await instance.patch(API_URLS.ADMIN.CATEGORY_BY_ID(id), data);
};

export const deleteAdminProductCategory = async (id: number) => {
  await instance.delete(API_URLS.ADMIN.CATEGORY_BY_ID(id));
};
