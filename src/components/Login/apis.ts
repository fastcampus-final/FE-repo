import { instance } from '@/api/instance';
import { MESSAGES } from '@/constants/messages';
import { setCookie } from '@/utils/cookie';
import { alterModal } from '../SignIn/function';

export const login = async (data: any, dispatch: any, router: any) => {
  await instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/auth/login',
    data: data,
  })
    .then(async (res) => {
      console.log(res);
      if (res.status === 200 && res.data.role === 'ROLE_USER') {
        await setCookie('accessToken', res.data.accessToken as string);
        await setCookie('refreshToken', res.data.refreshToken as string);
        await alterModal(MESSAGES.LOGIN.COMPLETE_LOGIN, dispatch);
        await router.back();
      } else if (res.status === 200 && res.data.role !== 'ROLE_USER') {
        await setCookie('accessToken', res.data.accessToken as string);
        await setCookie('refreshToken', res.data.refreshToken as string);
        await setCookie('isAdmin', res.data.role);
        await alterModal(MESSAGES.LOGIN.ADMIN_LOGIN, dispatch);
        await router.push('/admin');
      } else {
        await alterModal(MESSAGES.LOGIN.ERROR_LOGIN, dispatch);
      }
    })
    .catch(async (error) => {
      console.log(error);
      await alterModal(MESSAGES.LOGIN.ERROR_LOGIN, dispatch);
      // throw new Error(error);
    });
};
