import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { setCookie, getCookie } from '@/utils/cookie';
import Input from '@/components/common/Input';
import { instance } from '../api/instance';
import { IResProps } from '@/interfaces/loginResgister';
import { MESSAGES } from '@/constants/messages';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    if (getCookie('accessToken')) {
      alert('로그인된 계정입니다. 로그아웃 후 이용해주세요.');
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
            url: 'http://13.209.33.84:8080/user/login',
            data: {
              email: data.email,
              password: data.password,
            },
          })
            .then(async (res: IResProps) => {
              console.log(JSON.stringify(res));
              await setCookie('tokens', JSON.stringify(res.data.data));
              // await router.back();
            })
            .catch((error: IResProps) => {
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
