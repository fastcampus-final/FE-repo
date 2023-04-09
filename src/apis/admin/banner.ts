import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getAdminBanner = async () => {
  const { data } = await instance.get(API_URLS.ADMIN.BANNERLIST);
  return data;
};

export const getAdminBannerDetail = async (id: number) => {
  const { data } = await instance.get(API_URLS.ADMIN.BANNER_BY_ID(id));
  return data;
};

export const postAdminBanner = async (params: { image: string; productId: number | undefined }) => {
  const { data } = await instance.post(API_URLS.ADMIN.BANNER_ADD, params);
  return data;
};

export const putAdminBanner = async (
  id: number,
  params: { image: string; productId: number | undefined },
) => {
  const { data } = await instance.put(API_URLS.ADMIN.BANNER_EDIT(id), params);
  return data;
};

export const deleteAdminBanner = async (id: number) => {
  const { data } = await instance.delete(API_URLS.ADMIN.BANNER_BY_ID(id));
  return data;
};
