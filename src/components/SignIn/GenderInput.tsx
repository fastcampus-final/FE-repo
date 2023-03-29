import React from 'react';
import styled from '@emotion/styled';

export interface IInputProps {
  error: string;
  register: { name: string };
}

const GenderInput = ({ error, register }: IInputProps) => {
  return (
    <Inner>
      <Title>성별</Title>
      <InputsContainer>
        <InputContainer>
          <Label htmlFor="userGender">여</Label>
          <span>
            <Input id="userGender" type="radio" {...register} value="female" />
          </span>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="userGender">남</Label>
          <span>
            <Input id="userGender" type="radio" {...register} value="male" />
          </span>
        </InputContainer>
      </InputsContainer>
      {error && <div>{error}</div>}
    </Inner>
  );
};

export default GenderInput;

const Inner = styled.div`
  margin: 20px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  box-sizing: border-box;
`;

const Label = styled.label`
  color: #101010;
  font-size: 12px;
`;

const Input = styled.input`
  height: 14px;
  width: 14px;
`;

const InputsContainer = styled.div`
  border: 1px solid #878787;
  border-radius: 8px;
  height: 45px;
  width: 100%;
  display: flex;
  margin-top: 10px;
`;

const InputContainer = styled.div`
  width: 50%;
  box-sizing: border-box;
  padding: 0 25px;
  display: flex;
  align-items: center;
`;
