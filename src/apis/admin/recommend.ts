import { IRecommend } from '@/interfaces/product';
import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getAdminRecommendProduct = async () => {
  const { data } = await instance.get(API_URLS.ADMIN.RECOMMEND_LIST);
  return data;
};

export const getAdminRecommendProductDetail = async (id: number) => {
  const { data } = await instance.get(API_URLS.ADMIN.RECOMMEND_BY_ID(id));
  return data;
};

export const postAdminRecommendProduct = async (data: IRecommend) => {
  await instance.post(API_URLS.ADMIN.RECOMMEND, data);
};

export const putAdminRecommendProduct = async (id: number, data: object) => {
  await instance.put(API_URLS.ADMIN.RECOMMEND_BY_ID(id), data);
};

export const deleteAdminRecommendProduct = async (id: number) => {
  await instance.delete(API_URLS.ADMIN.RECOMMEND_BY_ID(id));
};
