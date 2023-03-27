import Input from '@/components/common/Input';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MESSAGES } from '@/constants/messages';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { alterModal, checkPassword } from '@/components/SignIn/function';
import { signUpLogin, signUp } from '@/components/SignIn/apis';
import GenderInput from '@/components/SignIn/GenderInput';
import EmailInput from '@/components/SignIn/EmailInput';
import { useDispatch } from 'react-redux';

const Signup = () => {
  const [emailCheck, setEmailCheck] = useState(false);
  const [cookies, ,] = useCookies();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      alterModal(MESSAGES.VALID_AUTH, dispatch);
      router.back();
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        if (confirm(MESSAGES.SIGNUP.SUBMIT_CHECK) && emailCheck) {
          await signUp(data, dispatch);
          await signUpLogin(data, dispatch, router);
        } else {
          await alterModal(MESSAGES.SIGNUP.INPUT_ERROR, dispatch);
        }
      })}
    >
      <Input
        error={errors.userName?.message as string}
        register={register('userName', {
          required: MESSAGES.INPUT.CHECK.NAME,
          pattern: {
            value: /[가-힣]{3,4}/,
            message: MESSAGES.INPUT.ERROR.NAME_PATTERN,
          },
          maxLength: {
            value: 4,
            message: MESSAGES.INPUT.ERROR.NAME_MAX,
          },
        })}
        id="userName"
        type="text"
        placeholder="홍길동"
        label="이름"
      />
      <GenderInput
        error={errors.userGender?.message as string}
        register={register('userGender', {
          required: MESSAGES.INPUT.CHECK.SEX,
        })}
      />

      <EmailInput
        error={errors.userEmail?.message as string}
        register={register('userEmail', {
          required: MESSAGES.INPUT.CHECK.EMAIL,
          pattern: {
            value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: MESSAGES.INPUT.ERROR.EMAIL_PATTERN,
          },
        })}
        email={watch('userEmail')}
        emailCheck={emailCheck}
        setEmailCheck={setEmailCheck}
      />
      <Input
        error={errors.userPassword?.message as string}
        register={register('userPassword', {
          required: MESSAGES.INPUT.CHECK.PASSWORD,
          minLength: {
            value: 8,
            message: MESSAGES.INPUT.ERROR.PASSWORD_MIN,
          },
          pattern: {
            value: /^(?=.*[A-Za-z!@#$%^&*()])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
            message: MESSAGES.INPUT.ERROR.PASSWORD_PATTERN,
          },
        })}
        id="userPassword"
        type="password"
        placeholder="********"
        label="비밀번호"
      />
      {checkPassword(watch('userPassword'))}
      <Input
        error={errors.passwordConfirmation?.message as string}
        register={register('passwordConfirmation', {
          required: MESSAGES.INPUT.CHECK.CONFIRM_PASSWORD,
          validate: (value) => value === watch('userPassword') || MESSAGES.LOGIN.CHECK_PASSWORD,
        })}
        id="passwordConfirmation"
        type="password"
        label="비밀번호 확인"
      />
      <Input
        error={errors.userBirth?.message as string}
        register={register('userBirth', {
          required: MESSAGES.INPUT.CHECK.BIRTH,
        })}
        id="userBirth"
        type="date"
        label="생년월일"
      />
      <Input
        error={errors.userPhoneNumber?.message as string}
        register={register('userPhoneNumber', {
          required: MESSAGES.INPUT.CHECK.PHONE,
          pattern: {
            value: /[0-9]{3}[0-9]{3,4}[0-9]{4}/,
            message: MESSAGES.INPUT.ERROR.PHONE_PATTERN,
          },
          maxLength: {
            value: 11,
            message: MESSAGES.INPUT.ERROR.PHONE_MAX,
          },
        })}
        id="userPhoneNumber"
        type="tel"
        placeholder="01011112222"
        label="전화번호"
      />

      <Button variant="contained" type="submit" disabled={isSubmitting}>
        회원가입
      </Button>
    </form>
  );
};

export default Signup;
