import React, { useEffect } from 'react';

import { setCookie, getCookie } from '@/utils/cookie';
import Input from '@/components/common/Input';
import { instance } from '@/api/instance';
import { ILoginProps } from '@/interfaces/loginResgister';
import { MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    if (getCookie('accessToken') && getCookie('refreshToken')) {
      alert(MESSAGES.VALID_AUTH);
      router.back();
      // console.log(getCookie('tokens'));
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
              if (res.data.status === 'OK') {
                await setCookie('accessToken', res.data.data?.accessToken as string);
                await setCookie('refreshToken', res.data.data?.refreshToken as string);
                await router.back();
              } else {
                console.log(MESSAGES.LOGIN.ERROR_LOGIN);
                alert(MESSAGES.LOGIN.ERROR_LOGIN);
              }
            })
            .catch((error: ILoginProps) => {
              console.log(error);
              alert(MESSAGES.LOGIN.ERROR_LOGIN);
              // throw new Error(error);
            });
        })}
      >
        <Input
          error={errors.email?.message as string}
          register={register('email', {
            required: '이메일은 필수 입력입니다.',
          })}
          id="email"
          type="email"
          placeholder="aaa@naver.com"
          label="이메일"
        />
        <Input
          error={errors.password?.message as string}
          register={register('password', {
            required: '비밀번호는 필수 입력입니다.',
          })}
          id="password"
          type="password"
          placeholder="********"
          label="비밀번호"
        />
        <button type="submit" disabled={isSubmitting}>
          로그인
        </button>
      </form>
      <div>
        <div>계정이 없으신가요? 그렇다면 회원가입 페이지로 이동해 주세요.</div>
        <Link href={ROUTES.SIGNUP}>
          <div>회원가입</div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
