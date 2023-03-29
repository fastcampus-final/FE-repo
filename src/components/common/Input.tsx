import { IInputProps } from '@/interfaces/inputProps';
import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Input = ({ error, register, id, placeholder, label, type }: IInputProps) => {
  const router = useRouter();

  return (
    <Inner>
      {router.asPath !== '/login' && <Label htmlFor={id}>{label}</Label>}
      <InputBox>
        <InputInner id={id} type={type} placeholder={placeholder} {...register} />
      </InputBox>
      {error && <div role="alert">{error}</div>}
    </Inner>
  );
};

export default Input;

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
