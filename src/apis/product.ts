import { IBase } from './../interfaces/base';
import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getProductList = async (keyword: string, page = 1) => {
  const { data } = await instance.get<IBase>(API_URLS.SEARCH_BY_KEYWORD(keyword, page));
  return data;
};
