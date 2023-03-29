import { MESSAGES } from '@/constants/messages';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { signupEmailCheck } from './apis';
import styled from '@emotion/styled';

export interface IInputProps {
  error: string;
  register: { name: string };
  email?: string;
  emailCheck?: boolean;
  setEmailCheck?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailInput = ({ register, error, email, setEmailCheck, emailCheck }: IInputProps) => {
  const router = useRouter();
  return (
    <Inner>
      {router.asPath !== '/login' && <Label htmlFor="userEmail">이메일 주소</Label>}
      <Input>
        <InputInner
          id="userEmail"
          type="email"
          placeholder="이메일 주소를 입력해 주세요"
          {...register}
        />
      </Input>
      {error && <div role="alert">{error}</div>}
      {/* {router.asPath === '/signup' && email !== undefined && setEmailCheck !== undefined && (
        <Button
          onClick={async () => {
            await signupEmailCheck(email, setEmailCheck);
            console.log(email, emailCheck);
          }}
        >
          중복확인
        </Button>
      )}
      {router.asPath === '/signup' &&
        (emailCheck ? (
          <div>{MESSAGES.SIGNUP.UNUSED_EMAIL}</div>
        ) : (
          <div>{MESSAGES.SIGNUP.USED_EMAIL}</div>
        ))} */}
    </Inner>
  );
};

export default EmailInput;

const Inner = styled.div`
  margin: 20px;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: bold;
  box-sizing: border-box;
`;

const Input = styled.div`
  margin-top: 10px;
  height: 45px;
  box-sizing: border-box;
`;

const InputInner = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  border: 1px solid #878787;
  border-radius: 8px;
`;
