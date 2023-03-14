import Input from '@/components/common/Input';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getCookie, setCookie } from '@/utils/cookie';

export default function Register() {
  const router = useRouter();

  if (getCookie('accessToken')) {
    alert('로그인된 계정입니다. 로그아웃 후 이용해주세요.');
    router.back();
    router.push('/');
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  const passwordRef = useRef('');
  passwordRef.current = watch('password');

  const checkPassword = () => {
    let res = '';
    let cnt = 0;
    const passwordCondition = ['[A-Z]', '[a-z]', '[0-9]', '[!@#$%^&*()]'];

    for (let i = 0; i < passwordCondition.length; i += 1) {
      if (new RegExp(passwordCondition[i]).test(watch('password'))) {
        cnt += 1;
      }
    }

    switch (cnt) {
      case 2:
        res = '낮음';
        break;
      case 3:
        res = '적정';
        break;
      case 4:
        res = '높음';
        break;
      default:
        return '';
    }
    return `비밀번호 안전도 : ${res}`;
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios({
          method: 'POST',
          url: 'http://13.209.33.84:8080/user/signup',
          data: data,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
            throw new Error(error);
          });

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

        await router.push('/register/success');
      })}
    >
      <Input
        error={errors.name?.message as string}
        register={register('name', {
          required: '이름은 필수 입력입니다.',
          pattern: {
            value: /[가-힣]{3,4}/,
            message: '이름 형식에 맞지 않습니다.',
          },
          maxLength: {
            value: 4,
            message: '이름은 3자리 이상 4자리 이하입니다.',
          },
        })}
        id="name"
        type="text"
        placeholder="홍길동"
        label="이름"
      />
      <Input
        error={errors.email?.message as string}
        register={register('email', {
          required: '이메일은 필수 입력입니다.',
          pattern: {
            value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: '이메일 형식에 맞지 않습니다.',
          },
        })}
        id="email"
        type="email"
        placeholder="abcd1234"
        label="이메일"
      />
      <Input
        error={errors.password?.message as string}
        register={register('password', {
          required: '비밀번호는 필수 입력입니다.',
          minLength: {
            value: 8,
            message: '8자리 이상 비밀번호를 사용하세요.',
          },
          pattern: {
            value: /^(?=.*[A-Za-z!@#$%^&*()])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
            message: '적합한 비밀번호가 아닙니다.',
          },
        })}
        id="password"
        type="password"
        placeholder="********"
        label="비밀번호"
      />
      {checkPassword()}
      <Input
        error={errors.passwordConfirmation?.message as string}
        register={register('passwordConfirmation', {
          required: '비밀번호 확인은 필수입니다.',
          validate: (value) => value === passwordRef.current || '비밀번호가 일치하지 않습니다.',
        })}
        id="passwordConfirmation"
        type="password"
        label="비밀번호 확인"
      />
      <Input
        error={errors.birth?.message as string}
        register={register('birth', {
          required: '생년월일은 필수 입력입니다.',
        })}
        id="birth"
        type="date"
        label="생년월일"
      />
      <Input
        error={errors.phone?.message as string}
        register={register('phone', {
          required: '전화번호는 필수 입력입니다.',
          pattern: {
            value: /[0-9]{3}[0-9]{3,4}[0-9]{4}/,
            message: '전화번호 형식에 맞지 않습니다.',
          },
          maxLength: {
            value: 11,
            message: '전화번호는 11자리 이하입니다.',
          },
        })}
        id="phone"
        type="tel"
        placeholder="01011112222"
        label="전화번호"
      />

      <button type="submit" disabled={isSubmitting}>
        회원가입
      </button>
    </form>
  );
}
