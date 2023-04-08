import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

interface IProps {
  error1: string;
  register1: { name: string };
  error2: string;
  register2: { name: string };
}

const PassportInput = ({ error1, register1, register2, error2 }: IProps) => {
  return (
    <Container>
      <LableContainer>
        <Label htmlFor="passport">
          이름 <Required>(필수)</Required>
        </Label>
      </LableContainer>
      <InputContainer>
        <Input
          id="passport"
          type="text"
          {...register1}
          placeholder="여권에 적힌 성을 입력해 주세요 (예 : HONG)"
        />
        {error1 && (
          <Error role="alert">
            <Image src="/icons/InputError.svg" alt="에러" width={16} height={16} />
            <ErrorMessage>{error1}</ErrorMessage>
          </Error>
        )}
      </InputContainer>
      <InputContainer>
        <Input
          id="passport"
          type="text"
          {...register2}
          placeholder="여권에 적힌 이름을 입력해 주세요 (예 : GILDONG)"
        />
        {error2 && (
          <Error role="alert">
            <Image src="/icons/InputError.svg" alt="에러" width={16} height={16} />
            <ErrorMessage>{error2}</ErrorMessage>
          </Error>
        )}
      </InputContainer>
    </Container>
  );
};

export default PassportInput;

const Container = styled.div`
  position: relative;
  margin-bottom: 50px;
`;

const Input = styled.input`
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
const InputContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
`;
