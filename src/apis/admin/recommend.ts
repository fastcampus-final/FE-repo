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
