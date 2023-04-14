import { instance } from '@/apis/instance';
import { alterModal } from '@/utils/check';

interface IGetNavDataProps {
  setDatas: React.Dispatch<
    React.SetStateAction<
      {
        categoryName: string;
        children: never[];
        categoryId: number;
      }[]
    >
  >;
  dispatch: any;
}
interface IGetNavBarDataProps {
  setCategories: React.Dispatch<
    React.SetStateAction<
      {
        categoryName: string;
        children: never[];
        categoryId: number;
      }[]
    >
  >;
  dispatch: any;
}

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
      if (res.status === 200) {
        removeCookies('accessToken');
        setCookies('accessToken', res.data.accessToken);
      } else headerLogout(router, dispatch, cookies, removeCookies);
    })
    .catch(() => {
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
    .catch(async () => {
      await removeCookies('accessToken');
      await removeCookies('refreshToken');
      await removeCookies('isAdmin');
      alterModal('서버 장애로 인해 로그아웃이 되지 않았습니다. 다시 시도해주세요.', dispatch);
    });
};

export const getNavData = ({ setDatas, dispatch }: IGetNavDataProps) => {
  instance({
    method: 'GET',
    url: 'https://www.go-together.store:443/categories',
  })
    .then((res) => {
      setDatas(res.data);
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};

export const getNavBarData = ({ setCategories, dispatch }: IGetNavBarDataProps) => {
  instance({
    method: 'GET',
    url: 'https://www.go-together.store:443/categories',
  })
    .then((res) => {
      setCategories(res.data);
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
