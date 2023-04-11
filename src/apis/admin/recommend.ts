import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getAdminRecommendProduct = async (page: number) => {
  const { data } = await instance.get(API_URLS.ADMIN.RECOMMEND_PAGE(page));
  return data;
};

export const getAdminRecommendProductDetail = async (id: number) => {
  const { data } = await instance.get(API_URLS.ADMIN.RECOMMEND_BY_ID(id));
  return data;
};

export const postAdminRecommendProduct = async (data: object) => {
  await instance.post(API_URLS.ADMIN.RECOMMEND, data);
};

export const patchRecommendProduct = async (id: number) => {
  await instance.patch(API_URLS.ADMIN.RECOMMEND_BY_ID(id));
};

export const deleteRecommendProduct = async (id: number) => {
  await instance.delete(API_URLS.ADMIN.RECOMMEND_BY_ID(id));
};
