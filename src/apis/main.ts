import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getBannerList = async () => {
  const { data } = await instance.get(API_URLS.BANNERLIST);
  return data;
};

export const getProductDetail = async (id: number) => {
  const { data } = await instance.get(API_URLS.PRODUCT_BY_ID(id));
  return data;
};

export const getPopularRegions = async () => {
  const { data } = await instance.get(API_URLS.POPULAR_REGIONS);
  return data;
};
