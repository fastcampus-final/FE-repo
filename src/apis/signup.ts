import { instance } from '@/apis/instance';
import { MESSAGES } from '@/constants/messages';
import { alterModal } from '../utils/check';

export const signUp = async (data: any, dispatch: any) => {
  await instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/auth/signup',
    data: { ...data, sns: 'none' },
  })
    .then(async (res) => {
      if (res.status === 201) {
        return res;
      } else {
        await alterModal(MESSAGES.SIGNUP.ERROR_SIGNUP, dispatch);
      }
    })
    .catch(async (error) => {
      await alterModal(MESSAGES.SIGNUP.ERROR_SIGNUP, dispatch);
    });
};

export const signUpLogin = async (data: any, dispatch: any, router: any, setCookies: any) => {
  await instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/auth/login',
    data: {
      userEmail: data.userEmail,
      userPassword: data.userPassword,
    },
  })
    .then(async (res) => {
      if (res.status === 200) {
        await setCookies('accessToken', res.data.accessToken as string);
        await setCookies('refreshToken', res.data.refreshToken as string);
        router.push({
          pathname: '/signup/success',
          query: { email: data.userEmail },
        });
        await alterModal(MESSAGES.SIGNUP.COMPLETE_SIGNUP, dispatch);
      } else if (res.status === 401) {
        await alterModal(MESSAGES.SIGNUP.WITHDRAWAL, dispatch);
      } else {
        await alterModal(MESSAGES.SIGNUP.MISS, dispatch);
      }
    })
    .catch(async (error) => {
      await alterModal(MESSAGES.LOGIN.ERROR_LOGIN, dispatch);
    });
};

export const signupEmailCheck = async (
  email: string,
  setEmailCheck: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  await instance({
    method: 'GET',
    url: `https://www.go-together.store:443/auth/email/check?userEmail=${email}`,
  })
    .then((res) => {
      if (res.status === 200 && setEmailCheck !== undefined) {
        setEmailCheck(true);
      } else if (res.status !== 200 && setEmailCheck !== undefined) {
        setEmailCheck(false);
      }
    })
    .catch((error) => {
      if (setEmailCheck !== undefined) {
        setEmailCheck(false);
      }
    });
};
