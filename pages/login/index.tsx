import React, { useEffect } from 'react';
import Input from '@/components/common/Input';
import { MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import Withdrawal from '@/components/Mypage/Withdrawal';
import EmailInput from '@/components/SignIn/EmailInput';
import { alterModal } from '@/components/SignIn/function';
import { login } from '@/components/Login/apis';
import styled from '@emotion/styled';
import PageTitle from '@/components/common/PageTitle';

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
    <Container>
      <div>
        <PageTitle title="로그인" />
      </div>
      <Text>
        <span>고투게더</span> 로그인 하시고
        <br />더 많은 혜택을 이용해 보세요.
      </Text>
      <form
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
      <div>
        <Withdrawal modal={modal} setmodal={setmodal} />
      </div>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  background-color: yellow;
  margin: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Text = styled.div`
  text-align: center;
`;
