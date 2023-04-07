import { MESSAGES } from '@/constants/messages';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { signupEmailCheck } from './apis';
import styled from '@emotion/styled';
import Image from 'next/image';

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
    <Container>
      <Email>
        <LabelContainer>
          <Label htmlFor="userEmail">이메일</Label>
        </LabelContainer>
        <InputContainer>
          <Input id="userEmail" type="email" placeholder="이메일을 입력해 주세요" {...register} />
        </InputContainer>
        {error && (
          <Error role="alert">
            <Image src="/icons/InputError.svg" alt="에러" width={16} height={16} />
            <ErrorMessage>{error}</ErrorMessage>
          </Error>
        )}
      </Email>
      {router.asPath === '/signup' && email !== undefined && setEmailCheck !== undefined && (
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
        ))}
    </Container>
  );
};

export default EmailInput;

const Container = styled.div`
  padding: 10px 0 20px;
  position: relative;
  padding: 0 20px 20px;
`;
const Email = styled.div`
  margin-bottom: 15px;
`;
const LabelContainer = styled.div`
  margin-bottom: 10px;
`;
const Label = styled.label`
  font-size: 16px;
`;
const InputContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  border: 3px solid #0cb1f3;
  padding: 0 15px;
  height: 42px;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  border: 0;
  outline: none;
`;
const Error = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  margin-top: 10px;
`;

const ErrorMessage = styled.span`
  margin-left: 5px;
  color: #f84a24;
`;
