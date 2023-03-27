import { instance } from '@/api/instance';
import { getCookie, removeCookie, setCookie } from '@/utils/cookie';

export const tokenRefresh = async (router: any) => {
  await instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/user/refresh',
    data: {
      refreshToken: getCookie('refreshToken'),
    },
  })
    .then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        removeCookie('accessToken');
        setCookie('accessToken', res.data.data.accessToken);
      } else headerLogout(router);
    })
    .catch((error) => {
      console.log(error);
      headerLogout(router);
    });
};

const headerLogout = async (router: any) => {
  instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/user/logout',
    data: {
      refreshToken: getCookie('refreshToken'),
    },
  })
    .then((res) => {
      if (res.data.code === 200) {
        alert('로그아웃이 완료되었습니다.');
        removeCookie('accessToken');
        removeCookie('refreshToken');
        router.push('/');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
