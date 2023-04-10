import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

export interface IInputProps {
  error: string;
  register: { name: string };
}

const GenderInput = ({ error, register }: IInputProps) => {
  return (
    <Container>
      <LableContainer>
        <Label htmlFor="userGender">
          성별 <Required>(필수)</Required>
        </Label>
      </LableContainer>
      <SelectContainer id="userGender" {...register}>
        <option disabled selected value="">
          성별을 선택해 주세요
        </option>
        <option value="male">남성</option>
        <option value="female">여성</option>
      </SelectContainer>
      {error && (
        <Error role="alert">
          <Image src="/icons/InputError.svg" alt="에러" width={16} height={16} />
          <ErrorMessage>{error}</ErrorMessage>
        </Error>
      )}
    </Container>
  );
};

export default GenderInput;

const Container = styled.div`
  position: relative;
  margin-bottom: 90px;
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
const SelectContainer = styled.select`
  width: 100%;
  height: 42px;
  border-radius: 8px;
  background-color: #f7f7f7;
  border: 1px solid #dadada;
  &::placeholder {
    color: #878787;
  }
  box-sizing: border-box;
  padding: 0 0 0 15px;
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
