import React, { useEffect } from 'react';
import Input from '@/components/common/Input';
import { MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import Withdrawal from '@/components/Mypage/Withdrawal';
import EmailInput from '@/components/SignIn/EmailInput';
import { alterModal } from '@/components/SignIn/function';
import { login } from '@/components/Login/apis';
import PageTitle from '@/components/common/PageTitle';
import styled from '@emotion/styled';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies();
  const [modal, setmodal] = useState(false);

  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      alterModal(MESSAGES.VALID_AUTH, dispatch);
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
      <Title>
        <PageTitle title="로그인" />
      </Title>
      <Form
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          await login(data, dispatch, router, setCookies);
        })}
      >
        <EmailInput
          error={errors.email?.message as string}
          register={register('email', {
            required: MESSAGES.INPUT.CHECK.EMAIL,
          })}
        />
        <Input
          error={errors.password?.message as string}
          register={register('password', {
            required: MESSAGES.INPUT.CHECK.PASSWORD,
          })}
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          label="비밀번호"
        />
        <ButtonContainer>
          <Button type="submit" disabled={isSubmitting}>
            로그인
          </Button>
        </ButtonContainer>
      </Form>
      {/* <div>
        <div>{MESSAGES.MOVE_TO_SIGNUP}</div>
        <Link href={ROUTES.SIGNUP}>
          <Button variant="contained">회원가입</Button>
        </Link>
      </div>
      <div>
        <Withdrawal modal={modal} setmodal={setmodal} />
      </div> */}
    </div>
  );
};

export default Login;

const Title = styled.h1`
  margin: 40px 0 20px;
  box-sizing: border-box;
`;

const Button = styled.button`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background-color: #6dd0f8;
  color: #fefefe;
  font-weight: semi-bold;
  font-size: 20px;
  border: 0;
  cursor: pointer;
`;

const Form = styled.form`
  padding-top: 10px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 270px 10px 20px;
`;
