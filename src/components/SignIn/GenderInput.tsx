import React from 'react';

export interface IInputProps {
  error: string;
  register: { name: string };
}

const GenderInput = ({ error, register }: IInputProps) => {
  return (
    <div>
      <label htmlFor="userGender">남자</label>
      <input id="userGender" type="radio" {...register} value="male" />
      <label htmlFor="userGender">여자</label>
      <input id="userGender" type="radio" {...register} value="female" />
      {error && <div>{error}</div>}
    </div>
  );
};

export default GenderInput;
