import Input from '@/components/common/Input';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MESSAGES } from '@/constants/messages';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { alterModal, checkPassword } from '@/components/SignIn/function';
import { signUpLogin, signUp } from '@/components/SignIn/apis';
import GenderInput from '@/components/SignIn/GenderInput';
import EmailInput from '@/components/SignIn/EmailInput';
import { useDispatch } from 'react-redux';
import PageTitle from '@/components/common/PageTitle';
import styled from '@emotion/styled';
import PassportInput from '@/components/SignIn/PassportInput';

const Signup = () => {
  const [emailCheck, setEmailCheck] = useState(false);
  const [cookies, setCookies] = useCookies();
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
    <Container>
      <Title>
        <PageTitle title="회원가입" />
      </Title>
      <Form
        onSubmit={handleSubmit(async (data) => {
          if (confirm(MESSAGES.SIGNUP.SUBMIT_CHECK) && emailCheck) {
            await signUp(data, dispatch);
            await signUpLogin(data, dispatch, router, setCookies);
          } else {
            await alterModal(MESSAGES.SIGNUP.INPUT_ERROR, dispatch);
          }
        })}
      >
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
          placeholder="비밀번호를 입력해 주세요"
          label="비밀번호"
        />
        {/* {checkPassword(watch('userPassword'))}
        <Input
          error={errors.passwordConfirmation?.message as string}
          register={register('passwordConfirmation', {
            required: MESSAGES.INPUT.CHECK.CONFIRM_PASSWORD,
            validate: (value) => value === watch('userPassword') || MESSAGES.LOGIN.CHECK_PASSWORD,
          })}
          id="passwordConfirmation"
          type="password"
          label="비밀번호 확인"
        /> */}
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
          placeholder="이름을 입력해 주세요"
          label="이름"
        />
        <PassportInput
          errorFirstName={errors.passportFirstName?.message as string}
          errorLastName={errors.passportLastName?.message as string}
          registerFirstName={register('passportFirstName', {
            required: MESSAGES.INPUT.CHECK.NAME,
            pattern: {
              value: /^[A-Z]+$/,
              message: MESSAGES.INPUT.ERROR.NAME_PATTERN,
            },
          })}
          registerLastName={register('passportLastName', {
            required: MESSAGES.INPUT.CHECK.NAME,
            pattern: {
              value: /^[A-Z]+$/,
              message: MESSAGES.INPUT.ERROR.NAME_PATTERN,
            },
          })}
        />
        <Input
          error={errors.userBirth?.message as string}
          register={register('userBirth', {
            required: MESSAGES.INPUT.CHECK.BIRTH,
          })}
          id="userBirth"
          type="text"
          label="생년월일"
          placeholder="생년월일 8자리를 입력해주세요 (예 : 20000101)"
        />
        <GenderInput
          error={errors.userGender?.message as string}
          register={register('userGender', {
            required: MESSAGES.INPUT.CHECK.SEX,
          })}
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
          placeholder="휴대폰 번호를 입력해주세요"
          label="연락처"
        />
        <ButtonContainer>
          <Button type="submit" disabled={isSubmitting}>
            회원가입
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const Title = styled.h1`
  margin: 40px 0 20px;
`;

const Button = styled.button`
  border-radius: 8px;
  background-color: #6dd0f8;
  color: #fefefe;
  font-weight: semi-bold;
  font-size: 20px;
  height: 45px;
  border: 0;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
`;
const Form = styled.form`
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  box-sizing: border-box;
  margin: 0 10px 15px;
`;
