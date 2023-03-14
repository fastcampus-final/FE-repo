import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { setCookie, getCookie } from '@/utils/cookie';
import Input from '@/components/common/Input';

const Login = () => {
  const router = useRouter();

  if (getCookie('accessToken')) {
    // alert('로그인된 계정입니다. 로그아웃 후 이용해주세요.');
    // router.back();
    // router.push('/');
    console.log(getCookie('accessToken'));
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          await axios({
            method: 'POST',
            url: 'http://13.209.33.84:8080/user/login',
            data: {
              email: data.email,
              password: data.password,
            },
          })
            .then((res) => {
              setCookie('accessToken', res.data.data.accessToken);
            })
            .catch((error) => {
              console.log(error);
              throw new Error(error);
            });

          await router.back();
          await router.push('/');
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
    </div>
  );
};

export default Login;
