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
import { alterModal } from '@/utils/check';
import { login } from '@/apis/login';
import styled from '@emotion/styled';
import PageTitle from '@/components/common/PageTitle';
import PasswordModal from '@/components/common/PasswordModal';

interface ICssProps {
  borderRight: string;
}

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
        <GoTogether>고투게더</GoTogether> 로그인 하시고
        <br />더 많은 혜택을 이용해 보세요.
      </Text>
      <form
        onSubmit={handleSubmit(async (data) => {
          await login(data, dispatch, router, setCookies);
        })}
      >
        <Input
          error={errors.userEmail?.message as string}
          register={register('userEmail', {
            required: MESSAGES.INPUT.CHECK.EMAIL,
          })}
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
        />
        <Input
          error={errors.userPassword?.message as string}
          register={register('userPassword', {
            required: MESSAGES.INPUT.CHECK.PASSWORD,
          })}
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
        />
        <LoginButton type="submit" disabled={isSubmitting}>
          로그인
        </LoginButton>
      </form>
      <Goto>
        <Link href={ROUTES.SIGNUP}>
          <GotoButton borderRight="1px solid #dadada">회원가입</GotoButton>
        </Link>
        <GotoButton
          borderRight="0"
          onClick={() => {
            setmodal(!modal);
            if (!modal) {
              document.body.style.overflow = 'hidden';
            } else {
              document.body.style.removeProperty('overflow');
            }
          }}
        >
          비밀번호 찾기
        </GotoButton>
        {modal && <PasswordModal setmodal={setmodal} />}
      </Goto>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  margin: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Text = styled.div`
  text-align: center;
  margin: 30px 0 50px 0;
  color: #585858;
  line-height: 20px;
  font-size: 14px;
`;

const GoTogether = styled.span`
  color: #0cb1f3;
`;

const LoginButton = styled.button`
  margin: 45px 0 20px;
  width: 335px;
  height: 44px;
  border-radius: 8px;
  background-color: #0cb1f3;
  color: white;
  font-weight: semibold;
  border: 0;
`;

const Goto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
`;

const GotoButton = styled.button`
  color: #101010;
  background-color: inherit;
  border: 0;
  padding: 0 15px;
  border-right: ${(props: ICssProps) => props.borderRight};
`;
