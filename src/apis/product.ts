import { instance } from './instance';
import { API_URLS } from '@/constants/apiUrls';

export const getProduct = async (
  keyword: string,
  page = 1,
  sort?: string,
  people?: number,
  dateOption?: string | null,
) => {
  const { data } = await instance.get(
    API_URLS.PRODUCT.SEARCH_BY_KEYWORD(keyword, page, sort, people, dateOption),
  );
  return data;
};

export const getProductByCategory = async (
  categoryId: string,
  page = 1,
  sort?: string,
  people?: number,
  dateOption?: string | null,
) => {
  const { data } = await instance.get(
    API_URLS.PRODUCT.SEARCH_BY_CATEGORY(categoryId, page, sort, people, dateOption),
  );
  return data;
};

export const getProductRecommend = async () => {
  const { data } = await instance.get(API_URLS.ADMIN.RECOMMEND);
  return data;
};

export const getProductDetail = async (id: number) => {
  const { data } = await instance.get(API_URLS.PRODUCT.PRODUCT_BY_ID(id));
  return data;
};

export const getRelatedProducts = async (id: number) => {
  const { data } = await instance.get(API_URLS.PRODUCT.PRODUCT_BY_RELATED(id));
  return data;
};

export const getProductByType = async () => {
  const { data } = await instance.get(API_URLS.PRODUCT.PRODUCT_BY_GROUP);
  return data;
};
