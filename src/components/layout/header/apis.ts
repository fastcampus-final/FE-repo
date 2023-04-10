import { instance } from '@/apis/instance';
import { alterModal } from '@/components/SignIn/function';

export const tokenRefresh = async (
  router: any,
  dispatch: any,
  cookies: any,
  removeCookies: any,
  setCookies: any,
) => {
  await instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/auth/token/refresh',
    data: {
      refreshToken: cookies.refreshToken,
    },
  })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        removeCookies('accessToken');
        setCookies('accessToken', res.data.accessToken);
      } else headerLogout(router, dispatch, cookies, removeCookies);
    })
    .catch((error) => {
      console.log(error);
      headerLogout(router, dispatch, cookies, removeCookies);
    });
};

const headerLogout = async (router: any, dispatch: any, cookies: any, removeCookies: any) => {
  instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/auth/logout',
    data: {
      refreshToken: cookies.refreshToken,
    },
  })
    .then(async (res) => {
      if (res.status === 200) {
        await removeCookies('accessToken');
        await removeCookies('refreshToken');
        await removeCookies('isAdmin');
        await alterModal('로그아웃이 완료되었습니다.', dispatch);
        router.push('/');
      } else if (res.status === 401) {
        await removeCookies('accessToken');
        await removeCookies('refreshToken');
        await removeCookies('isAdmin');
        await alterModal('이미 로그아웃이 된 계정입니다.', dispatch);
        router.push('/');
      } else {
        await removeCookies('accessToken');
        await removeCookies('refreshToken');
        await removeCookies('isAdmin');
        await alterModal(
          '서버 장애로 인해 로그아웃이 되지 않았습니다. 다시 시도해주세요.',
          dispatch,
        );
      }
    })
    .catch(async (error) => {
      await removeCookies('accessToken');
      await removeCookies('refreshToken');
      await removeCookies('isAdmin');
      console.log(error);
      alterModal('서버 장애로 인해 로그아웃이 되지 않았습니다. 다시 시도해주세요.', dispatch);
    });
};
