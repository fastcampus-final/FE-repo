import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getReservationList = async () => {
  const { data } = await instance.get(API_URLS.MYPAGE.RESERVATIONS);
  return data;
};

export const getReservationDetail = async (id: number) => {
  const { data } = await instance.get(API_URLS.MYPAGE.RESERVATIONS_BY_ID(id));
  return data;
};
