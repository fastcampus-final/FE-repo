import Input from '@/components/common/Input';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { instance } from '@/api/instance';
import { ISignUpProps, ILoginProps } from '@/interfaces/loginResgister';
import { MESSAGES } from '@/constants/messages';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { useCookies } from 'react-cookie';

const Signup = () => {
  const [emailCheck, setEmailCheck] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.VALID_AUTH,
        }),
      );
      router.back();
    }
  }, []);

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
        if (confirm(MESSAGES.SIGNUP.SUBMIT_CHECK) && emailCheck) {
          await instance({
            method: 'POST',
            url: 'https://www.go-together.store:443/user/signup',
            data: data,
          })
            .then((res: ISignUpProps) => {
              console.log(res);
              console.log(data);
            })
            .catch((error: ISignUpProps) => {
              console.log(error);
              dispatch(
                setModal({
                  isOpen: true,
                  onClickOk: () => dispatch(setModal({ isOpen: false })),
                  text: MESSAGES.SIGNUP.ERROR_SIGNUP,
                }),
              );
            });

          await instance({
            method: 'POST',
            url: 'https://www.go-together.store:443/user/login',
            data: {
              email: data.email,
              password: data.password,
            },
          })
            .then(async (res: ILoginProps) => {
              if (res.data.code === 200) {
                await setCookies('accessToken', res.data.data?.accessToken as string);
                await setCookies('refreshToken', res.data.data?.refreshToken as string);
                await router.push('/signup/success');
                await dispatch(
                  setModal({
                    isOpen: true,
                    onClickOk: () => dispatch(setModal({ isOpen: false })),
                    text: MESSAGES.SIGNUP.COMPLETE_SIGNUP,
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
            });
        } else {
          dispatch(
            setModal({
              isOpen: true,
              onClickOk: () => dispatch(setModal({ isOpen: false })),
              text: MESSAGES.SIGNUP.INPUT_ERROR,
            }),
          );
        }
      })}
    >
      <Input
        error={errors.name?.message as string}
        register={register('name', {
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
        id="name"
        type="text"
        placeholder="홍길동"
        label="이름"
      />
      {/* <Input
        error={errors.sex?.message as string}
        register={register('sex', {
          required: MESSAGES.INPUT.CHECK.SEX,
        })}
        id="sex"
        type="radio"
        label="남자"
        value="male"
      />
      <Input
        error={errors.sex?.message as string}
        register={register('sex', {
          required: MESSAGES.INPUT.CHECK.SEX,
        })}
        id="sex"
        type="radio"
        label="여자"
        value="female"
      /> */}

      <Input
        error={errors.email?.message as string}
        register={register('email', {
          required: MESSAGES.INPUT.CHECK.EMAIL,
          pattern: {
            value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: MESSAGES.INPUT.ERROR.EMAIL_PATTERN,
          },
        })}
        id="email"
        type="email"
        placeholder="aaa@naver.com"
        label="이메일"
        email={watch('email')}
        emailCheck={emailCheck}
        setEmailCheck={setEmailCheck}
      />
      <Input
        error={errors.password?.message as string}
        register={register('password', {
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
        id="password"
        type="password"
        placeholder="********"
        label="비밀번호"
      />
      {checkPassword()}
      <Input
        error={errors.passwordConfirmation?.message as string}
        register={register('passwordConfirmation', {
          required: MESSAGES.INPUT.CHECK.CONFIRM_PASSWORD,
          validate: (value) => value === passwordRef.current || MESSAGES.LOGIN.CHECK_PASSWORD,
        })}
        id="passwordConfirmation"
        type="password"
        label="비밀번호 확인"
      />
      <Input
        error={errors.birth?.message as string}
        register={register('birth', {
          required: MESSAGES.INPUT.CHECK.BIRTH,
        })}
        id="birth"
        type="date"
        label="생년월일"
      />
      <Input
        error={errors.phone?.message as string}
        register={register('phone', {
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
        id="phone"
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
