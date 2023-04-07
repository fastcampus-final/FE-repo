import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getProduct = async (
  keyword: string,
  page = 1,
  sort?: string,
  people?: number,
  dateOption?: string | null,
) => {
  const { data } = await instance.get(
    API_URLS.SEARCH_BY_KEYWORD(keyword, page, sort, people, dateOption),
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
    API_URLS.SEARCH_BY_CATEGORY(categoryId, page, sort, people, dateOption),
  );
  return data;
};

export const getProductRecommend = async () => {
  const { data } = await instance.get(API_URLS.ADMIN.RECOMMEND);
  return data;
};
