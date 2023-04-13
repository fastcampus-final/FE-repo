import styled from '@emotion/styled';
import React from 'react';

interface IProps {
  firstName: string;
  lastName: string;
}

const NotInputPassport = ({ firstName, lastName }: IProps) => {
  return (
    <Container>
      <LableContainer>
        <Label htmlFor="passport">여권명</Label>
      </LableContainer>
      <InputContainer>
        <Input id="passport" type="text" value={firstName} disabled />
      </InputContainer>
      <InputContainer>
        <Input id="passport" type="text" value={lastName} disabled />
      </InputContainer>
    </Container>
  );
};

export default NotInputPassport;

const Container = styled.div`
  position: relative;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 100%;
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
const LableContainer = styled.div`
  margin-bottom: 10px;
`;
const Label = styled.label`
  font-size: 16px;
`;
const InputContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
`;
