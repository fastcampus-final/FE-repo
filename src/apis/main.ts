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

export const getProductCategory = async () => {
  const { data } = await instance.get(API_URLS.CATEGORY);
  return data;
};

export const getProductCategoryDetail = async (id: number) => {
  const { data } = await instance.get(API_URLS.CATEGORY_DETAIL(id));
  return data;
};

export const getPopularProduct = async (id?: number) => {
  const { data } = await instance.get(API_URLS.POPULAR_PRODUCTS(id));
  return data;
};

export const getGroupProduct = async () => {
  const { data } = await instance.get(API_URLS.GROUP_PRODUCTS);
  return data;
};

export const getUserInfo = async () => {
  const { data } = await instance.get(API_URLS.USER_INFO);
  return data;
};
