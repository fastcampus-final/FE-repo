import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getProductList = async (
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
