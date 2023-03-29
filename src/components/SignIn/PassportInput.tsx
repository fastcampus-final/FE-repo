import React from 'react';
import styled from '@emotion/styled';

interface IPassportProps {
  errorFirstName: string;
  errorLastName: string;
  registerFirstName: { name: string };
  registerLastName: { name: string };
}

const PassportInput = ({
  errorFirstName,
  errorLastName,
  registerFirstName,
  registerLastName,
}: IPassportProps) => {
  return (
    <Inner>
      <Label htmlFor="passport">여권명</Label>
      <InputBox>
        <InputInner
          id="passport"
          type="text"
          placeholder="여권에 적힌 성을 입력해 주세요 (예 : HONG)"
          {...registerFirstName}
        />
      </InputBox>
      {errorFirstName && <div role="alert">{errorFirstName}</div>}
      <InputBox>
        <InputInner
          id="passport"
          type="text"
          placeholder="여권에 적힌 이름을 입력해 주세요 (예 : GILDONG)"
          {...registerLastName}
        />
      </InputBox>
      {errorLastName && <div role="alert">{errorLastName}</div>}
    </Inner>
  );
};

export default PassportInput;

const Inner = styled.div`
  margin: 20px;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: bold;
  box-sizing: border-box;
`;
const InputBox = styled.div`
  margin-top: 10px;
  height: 45px;
  box-sizing: border-box;
`;

const InputInner = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  border: 1px solid #878787;
  border-radius: 8px;
`;
