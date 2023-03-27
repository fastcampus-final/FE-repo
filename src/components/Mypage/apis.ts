import { instance } from '@/api/instance';
import { MESSAGES } from '@/constants/messages';
import { IPatchMyInfoProps } from '@/interfaces/myinfo';
import { getCookie, removeCookie } from '@/utils/cookie';
import { alterModal } from '../SignIn/function';

export const patchMyInfo = async (
  data: any,
  setPatchInfo: React.Dispatch<React.SetStateAction<IPatchMyInfoProps>>,
  patchInfo: IPatchMyInfoProps,
  setChangeInfo: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: any,
) => {
  await instance({
    method: 'PATCH',
    url: 'https://www.go-together.store:443/user/myInfo',
    data: data,
  })
    .then(async (res) => {
      console.log(res);
      if (res.data.code === 200) {
        await setPatchInfo({ ...patchInfo, phone: res.data.data.phone });
        await setChangeInfo(false);
        await alterModal(MESSAGES.CHANGE_INFO, dispatch);
      } else {
        await alterModal(res.data.data, dispatch);
      }
    })
    .catch(async (error) => {
      console.log(error);
      await alterModal(error, dispatch);
    });
};

export const searchMyPassword = async (data: any, dispatch: any) => {
  await instance({
    method: 'POST',
    url: `https://www.go-together.store:443/auth/find/password?email=${data.email}`,
  })
    .then(async (res) => {
      console.log(res);
      await alterModal('이메일로 비밀번호 변경 url이 발송되었습니다.', dispatch);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteMyAccount = async (data: any, dispatch: any, router: any) => {
  await instance({
    method: 'DELETE',
    url: 'https://www.go-together.store:443/user/withdraw',
    data: data,
  })
    .then(async (res) => {
      if (res.data.code === 200) {
        await removeCookie('accessToken');
        await removeCookie('refreshToken');
        await removeCookie('isAdmin');
        await alterModal(MESSAGES.WITHDRAWAL.COMPLETE, dispatch);
        await router.push('/');
      } else {
        await alterModal(res.data.data, dispatch);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getMyInfo = async (
  setMyinfo: React.Dispatch<React.SetStateAction<IPatchMyInfoProps>>,
) => {
  instance({
    method: 'GET',
    url: 'https://www.go-together.store:443/user/myInfo',
  })
    .then((res) => {
      console.log(res);
      setMyinfo(res.data.data);
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error);
    });
};

export const mypageLogout = async (dispatch: any, router: any) => {
  await instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/auth/logout',
    data: {
      refreshToken: getCookie('refreshToken'),
    },
  })
    .then(async (res) => {
      console.log(res);
      if (res.status === 200) {
        removeCookie('accessToken');
        removeCookie('refreshToken');
        removeCookie('isAdmin');
        await alterModal(MESSAGES.LOGOUT.COMPLETE_LOGOUT, dispatch);
        router.push('/');
      } else {
        await alterModal(MESSAGES.LOGOUT.ERROR_LOGOUT, dispatch);
      }
    })
    .catch((error) => {
      console.log(error);
      alterModal(MESSAGES.LOGOUT.ERROR_LOGOUT, dispatch);
    });
};
