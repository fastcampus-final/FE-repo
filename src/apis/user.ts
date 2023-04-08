import { instance } from '@/apis/instance';
import { API_URLS } from '@/constants/apiUrls';

export const setUserType = async (data: object) => {
  await instance.patch(API_URLS.USER_TYPE, data);
};
