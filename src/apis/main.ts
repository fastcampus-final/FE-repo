import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getBannerList = async () => {
  const { data } = await instance.get(API_URLS.BANNER);
  return data;
};

export const getProductDetail = async (id: number) => {
  const { data } = await instance.get(API_URLS.PRODUCT.PRODUCT_BY_ID(id));
  return data;
};

export const getPopularRegions = async () => {
  const { data } = await instance.get(API_URLS.PRODUCT.PRODUCT_BY_RECOMMEND);
  return data;
};

export const getProductCategory = async () => {
  const { data } = await instance.get(API_URLS.CATEGORY);
  return data;
};

export const getProductCategoryDetail = async (id: number) => {
  const { data } = await instance.get(API_URLS.CATEGORY_BY_ID(id));
  return data;
};

export const getPopularProduct = async (id?: number) => {
  const { data } = await instance.get(API_URLS.PRODUCT.PRODUCT_BY_POPULAR(id));
  return data;
};

export const getGroupProduct = async () => {
  const { data } = await instance.get(API_URLS.PRODUCT.PRODUCT_BY_GROUP);
  return data;
};

export const getUserInfo = async () => {
  const { data } = await instance.get(API_URLS.USER.INFO);
  return data;
};
