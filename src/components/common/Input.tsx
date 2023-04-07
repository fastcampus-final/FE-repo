import { IInputProps } from '@/interfaces/inputProps';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const Input = ({ error, register, id, type, placeholder, label }: IInputProps) => {
  const router = useRouter();

  return (
    <Container>
      <label htmlFor={id}>{label}</label>
      <InputContainer id={id} type={type} placeholder={placeholder} {...register} />
      {error && (
        <Error role="alert">
          <Image src="/icons/InputError.svg" alt="에러" width={16} height={16} />
          <ErrorMessage>{error}</ErrorMessage>
        </Error>
      )}
    </Container>
  );
};

export default Input;

const Container = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const InputContainer = styled.input`
  width: 335px;
  height: 42px;
  border-radius: 8px;
  background-color: #f7f7f7;
  border: 1px solid #dadada;
  &::placeholder {
    color: #878787;
  }
  box-sizing: border-box;
  padding: 0 15px;
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
