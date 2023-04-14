import { IInputProps } from '@/interfaces/inputProps';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface ICssProps {
  margin: () => string;
}
interface ICssInputProps {
  width: string;
  padding: string;
}

const Input = ({ error, register, id, type, placeholder, label }: IInputProps) => {
  const router = useRouter();
  const margin = () => {
    if (router.asPath === '/signup' && id !== 'passwordConfirmation') {
      return '50';
    } else if (router.asPath === '/signup' && id === 'passwordConfirmation') {
      return '70';
    } else if (router.asPath.slice(0, 12) === '/mypage/info' && id !== 'passwordConfirmation') {
      return '50';
    } else if (router.asPath.slice(0, 12) === '/mypage/info' && id === 'passwordConfirmation') {
      return '70';
    } else return '40';
  };

  return (
    <Container margin={margin}>
      <LableContainer>
        <Label htmlFor={id}>
          {label}
          {router.asPath === '/signup' && <Required>(필수)</Required>}
        </Label>
      </LableContainer>
      <InputContainer
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        width={
          router.asPath === '/signup' || router.asPath.slice(0, 12) === '/mypage/info'
            ? '100%'
            : '335px'
        }
        padding={
          router.asPath === '/signup' || router.asPath.slice(0, 12) === '/mypage/info'
            ? '0'
            : '15px'
        }
      />
      {error && (
        <Error role="alert">
          <Image src="/icons/InputError.svg" alt="에러" width={16} height={16} />
          <ErrorMessage>{error}</ErrorMessage>
        </Error>
      )}
      {id === 'passwordConfirmation' && (
        <PasswordNotion>
          비밀번호는 8~16자의 영어 대소문자, 숫자 및 특수문자로 사용 가능합니다
        </PasswordNotion>
      )}
    </Container>
  );
};

export default Input;

const Container = styled.div`
  position: relative;
  margin-bottom: ${(props: ICssProps) => props.margin}px;
`;

const InputContainer = styled.input`
  width: ${(props: ICssInputProps) => props.width};
  height: 42px;
  border-radius: 8px;
  background-color: #f7f7f7;
  border: 1px solid #dadada;
  &::placeholder {
    color: #878787;
  }
  box-sizing: border-box;
  padding: 0 ${(props) => props.padding} 0 15px;
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
const LableContainer = styled.div`
  margin-bottom: 10px;
`;
const Label = styled.label`
  font-size: 16px;
`;
const Required = styled.span`
  color: #0cb1f3;
  padding-left: 5px;
  font-size: 12px;
`;
const PasswordNotion = styled.div`
  position: absolute;
  top: 100px;
  font-size: 13.5px;
  color: #878787;
`;
