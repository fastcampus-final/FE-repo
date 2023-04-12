import { INotInputProps } from '@/interfaces/notInputProps';
import styled from '@emotion/styled';
import React from 'react';

const NotInput = ({ id, label, type, value }: INotInputProps) => {
  return (
    <Container>
      <LableContainer>
        <Label htmlFor={id}>{label}</Label>
      </LableContainer>
      <InputContainer type={type} value={value} disabled />
    </Container>
  );
};

export default NotInput;

const Container = styled.div`
  position: relative;
  margin-bottom: 40px;
`;
const InputContainer = styled.input`
  width: 100%;
  height: 42px;
  border-radius: 8px;
  background-color: #f7f7f7;
  border: 1px solid #dadada;
  &::placeholder {
    color: #878787;
  }
  box-sizing: border-box;
  padding: 0 15px 0 15px;
`;
const LableContainer = styled.div`
  margin-bottom: 10px;
`;
const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;
