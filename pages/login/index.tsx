import React, { useEffect } from 'react';
import Input from '@/components/common/Input';
import { instance } from '@/api/instance';
import { ILoginProps } from '@/interfaces/loginResgister';
import { MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { useCookies } from 'react-cookie';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookies] = useCookies();

  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      alert(MESSAGES.VALID_AUTH);
      router.back();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          await instance({
            method: 'POST',
            url: 'https://www.go-together.store:443/user/login',
            data: {
              email: data.email,
              password: data.password,
            },
          })
            .then(async (res: ILoginProps) => {
              console.log(res);
              if (res.data.code === 200) {
                await setCookies('accessToken', res.data.data?.accessToken as string);
                await setCookies('refreshToken', res.data.data?.refreshToken as string);
                await dispatch(
                  setModal({
                    isOpen: true,
                    onClickOk: () => dispatch(setModal({ isOpen: false })),
                    text: MESSAGES.LOGIN.COMPLETE_LOGIN,
                  }),
                );
                await router.back();
              } else if (res.data.code === 300) {
                await setCookies('accessToken', res.data.data?.accessToken as string);
                await setCookies('refreshToken', res.data.data?.refreshToken as string);
                await setCookies('isAdmin', 'true');
                await dispatch(
                  setModal({
                    isOpen: true,
                    onClickOk: () => dispatch(setModal({ isOpen: false })),
                    text: MESSAGES.LOGIN.ADMIN_LOGIN,
                  }),
                );
                await router.push('/admin');
              } else if (res.data.code === 400) {
                dispatch(
                  setModal({
                    isOpen: true,
                    onClickOk: () => dispatch(setModal({ isOpen: false })),
                    text: MESSAGES.LOGIN.WITHDRAWAL,
                  }),
                );
              } else {
                dispatch(
                  setModal({
                    isOpen: true,
                    onClickOk: () => dispatch(setModal({ isOpen: false })),
                    text: MESSAGES.LOGIN.ERROR_LOGIN,
                  }),
                );
              }
            })
            .catch((error: ILoginProps) => {
              console.log(error);
              dispatch(
                setModal({
                  isOpen: true,
                  onClickOk: () => dispatch(setModal({ isOpen: false })),
                  text: MESSAGES.LOGIN.ERROR_LOGIN,
                }),
              );
              // throw new Error(error);
            });
        })}
      >
        <Input
          error={errors.email?.message as string}
          register={register('email', {
            required: MESSAGES.INPUT.CHECK.EMAIL,
          })}
          id="email"
          type="email"
          placeholder="aaa@naver.com"
          label="이메일"
        />
        <Input
          error={errors.password?.message as string}
          register={register('password', {
            required: MESSAGES.INPUT.CHECK.PASSWORD,
          })}
          id="password"
          type="password"
          placeholder="********"
          label="비밀번호"
        />
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          로그인
        </Button>
      </form>
      <div>
        <div>{MESSAGES.MOVE_TO_SIGNUP}</div>
        <Link href={ROUTES.SIGNUP}>
          <Button variant="contained">회원가입</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
