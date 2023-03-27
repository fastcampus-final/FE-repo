import { instance } from '@/api/instance';
import { MESSAGES } from '@/constants/messages';
import { setCookie } from '@/utils/cookie';
import { alterModal } from './function';

export const signUp = async (data: any, dispatch: any) => {
  await instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/auth/signup',
    data: { ...data, sns: 'none' },
  })
    .then(async (res) => {
      if (res.status === 201) {
        console.log(res);
      } else {
        console.log(res);
        await alterModal(MESSAGES.SIGNUP.ERROR_SIGNUP, dispatch);
      }
    })
    .catch(async (error) => {
      console.log(error);
      await alterModal(MESSAGES.SIGNUP.ERROR_SIGNUP, dispatch);
    });
};

export const signUpLogin = async (data: any, dispatch: any, router: any) => {
  await instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/auth/login',
    data: {
      email: data.userEmail,
      password: data.userPassword,
    },
  })
    .then(async (res) => {
      console.log(res);
      if (res.status === 200) {
        await setCookie('accessToken', res.data.accessToken as string);
        await setCookie('refreshToken', res.data.refreshToken as string);
        router.push('/signup/success');
        await alterModal(MESSAGES.SIGNUP.COMPLETE_SIGNUP, dispatch);
      } else {
        await alterModal(MESSAGES.LOGIN.ERROR_LOGIN, dispatch);
      }
    })
    .catch(async (error) => {
      console.log(error);
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
      console.log(res);
      if (res.status === 200 && setEmailCheck !== undefined) {
        setEmailCheck(true);
      } else if (res.status !== 200 && setEmailCheck !== undefined) {
        setEmailCheck(false);
      }
    })
    .catch((error) => {
      console.log(error);
      if (setEmailCheck !== undefined) {
        setEmailCheck(false);
      }
    });
};
