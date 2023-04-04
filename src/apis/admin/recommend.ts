import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getAdminRecommendProduct = async () => {
  const { data } = await instance.get(API_URLS.ADMIN.RECOMMEND);
  return data;
};

export const getAdminRecommendProductDetail = async (id: string) => {
  const { data } = await instance.get(API_URLS.ADMIN.RECOMMEND_BY_ID(id));
  return data;
};
