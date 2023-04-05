import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const uploadImage = async (image: string, category: string) => {
  const form = new FormData();
  form.append('file', image);

  const { data } = await instance.post(API_URLS.UPLOAD_IMAGE(category), form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
