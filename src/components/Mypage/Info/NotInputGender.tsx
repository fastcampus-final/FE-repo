import styled from '@emotion/styled';
import React from 'react';

const NotInputGender = ({ gender }: { gender: string }) => {
  return (
    <Container>
      <LableContainer>
        <Label htmlFor="userGender">성별</Label>
      </LableContainer>
      <SelectContainer id="userGender" disabled>
        <option value="male" selected={gender === 'male' ? true : false}>
          남성
        </option>
        <option value="female" selected={gender === 'female' ? true : false}>
          여성
        </option>
      </SelectContainer>
    </Container>
  );
};

export default NotInputGender;

const Container = styled.div`
  position: relative;
  margin-bottom: 40px;
`;
const LableContainer = styled.div`
  margin-bottom: 10px;
`;
const Label = styled.label`
  font-size: 16px;
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
