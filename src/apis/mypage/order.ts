import { API_URLS } from '@/constants/apiUrls';
import { instance } from '../instance';

export const getReservationList = async () => {
  const { data } = await instance.get(API_URLS.ORDER);
  return data;
};

export const getReservationDetail = async (id: number) => {
  const { data } = await instance.get(API_URLS.ORDER_BY_ID(id));
  return data;
};

export const deleteReservation = async (id: number) => {
  const { data } = await instance.delete(API_URLS.ORDER_BY_ID(id));
  return data;
};
