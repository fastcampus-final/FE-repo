import { MESSAGES } from '@/constants/messages';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { signupEmailCheck } from '../../apis/signup';
import styled from '@emotion/styled';
import Image from 'next/image';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export interface IInputProps {
  error: string;
  register: { name: string };
  email?: string;
  emailCheck?: boolean;
  setEmailCheck?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ICssProps {
  background: string;
  border: string;
}
interface ICssContainerProps {
  padding: string;
  border: string;
}
interface ICssErrorProps {
  bottom: string;
}

const EmailInput = ({ register, error, email, setEmailCheck, emailCheck }: IInputProps) => {
  const [focus, setFocus] = useState(false);
  const router = useRouter();
  return (
    <Container
      padding={router.asPath === '/signup' ? '45px' : '20px'}
      border={router.asPath === '/signup' ? '1px solid #dadada' : '0'}
    >
      <Email>
        <LabelContainer>
          <Label htmlFor="userEmail">
            이메일{router.asPath === '/signup' && <Required>(필수)</Required>}
          </Label>
        </LabelContainer>
        <SignUp>
          <InputContainer
            background={router.asPath === '/signup' ? '#F7F7F7' : '#fff'}
            border={router.asPath === '/signup' ? '1px solid #dadada' : '3px solid #0cb1f3'}
          >
            <Input
              id="userEmail"
              type="email"
              placeholder="이메일을 입력해 주세요"
              {...register}
              onFocus={() => setFocus(true)}
            />
          </InputContainer>
          {router.asPath === '/signup' && setEmailCheck !== undefined && (
            <Button
              onClick={async () => {
                await signupEmailCheck(email as string, setEmailCheck);
              }}
            >
              중복확인
            </Button>
          )}
        </SignUp>
        {error && (
          <Error role="alert" bottom={router.asPath === '/signup' ? '10px' : 'initial'}>
            <Image src="/icons/InputError.svg" alt="에러" width={16} height={16} />
            <ErrorMessage color="#f84a24">{error}</ErrorMessage>
          </Error>
        )}
      </Email>
      {router.asPath === '/signup' &&
        focus &&
        (emailCheck ? (
          <Error role="alert" bottom={router.asPath === '/signup' ? '30px' : 'initial'}>
            <CheckCircleOutlineIcon fontSize="small" color="primary" />
            <ErrorMessage color="#0cb1f3">{MESSAGES.SIGNUP.UNUSED_EMAIL}</ErrorMessage>
          </Error>
        ) : (
          <Error role="alert" bottom={router.asPath === '/signup' ? '30px' : 'initial'}>
            <Image src="/icons/InputError.svg" alt="에러" width={16} height={16} />
            <ErrorMessage color="#f84a24">{MESSAGES.SIGNUP.USED_EMAIL}</ErrorMessage>
          </Error>
        ))}
    </Container>
  );
};

export default EmailInput;

const Container = styled.div`
  position: relative;
  padding: 0 0 ${(props: ICssContainerProps) => props.padding};
  border-bottom: ${(props) => props.border};
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
  border: ${(props: ICssProps) => props.border};
  padding: 0 15px;
  height: 42px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.background};
`;
const Input = styled.input`
  width: 100%;
  border: 0;
  outline: none;
  background-color: inherit;
`;
const Error = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  padding-bottom: 10px;
  bottom: ${(props: ICssErrorProps) => props.bottom};
`;

const ErrorMessage = styled.span`
  margin-left: 5px;
  color: ${(props) => props.color};
`;

const Button = styled.button`
  min-width: 84px;
  height: 42px;
  border: 1px solid #dadada;
  color: #101010;
  margin: 0 10px;
  background-color: white;
  border-radius: 8px;
`;
const SignUp = styled.div`
  display: flex;
`;
const Required = styled.span`
  color: #0cb1f3;
  font-size: 12px;
  margin-left: 5px;
`;
