import { instance } from '@/apis/instance';
import { MESSAGES } from '@/constants/messages';
import { alterModal } from '../utils/check';

export const login = async (data: any, dispatch: any, router: any, setCookies: any) => {
  await instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/auth/login',
    data: data,
  })
    .then(async (res) => {
      if (res.status === 200 && res.data.role === 'ROLE_USER') {
        await setCookies('accessToken', res.data.accessToken as string);
        await setCookies('refreshToken', res.data.refreshToken as string);
        await alterModal(MESSAGES.LOGIN.COMPLETE_LOGIN, dispatch);
        await router.back();
      } else if (res.status === 200 && res.data.role === 'ROLE_ADMIN') {
        await router.push('/admin/user');
        await setCookies('accessToken', res.data.accessToken as string);
        await setCookies('refreshToken', res.data.refreshToken as string);
        await setCookies('isAdmin', res.data.role);
        await alterModal(MESSAGES.LOGIN.ADMIN_LOGIN, dispatch);
      } else if (res.status === 401) {
        await alterModal(MESSAGES.LOGIN.WITHDRAWAL, dispatch);
      } else if (res.status === 404) {
        await alterModal(MESSAGES.LOGIN.CHECK, dispatch);
      } else {
        await alterModal(MESSAGES.LOGIN.ERROR_LOGIN, dispatch);
      }
    })
    .catch(async () => {
      await alterModal(MESSAGES.LOGIN.ERROR_LOGIN, dispatch);
    });
};
