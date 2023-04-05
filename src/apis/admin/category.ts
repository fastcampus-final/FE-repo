import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getAdminProductCategory = async () => {
  const { data } = await instance.get(API_URLS.ADMIN.CATEGORY);
  return data;
};

export const getAdminProductCategoryDetail = async (id: string) => {
  const { data } = await instance.get(API_URLS.ADMIN.CATEGORY_BY_ID(id));
  return data;
};
