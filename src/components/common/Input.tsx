import { IInputProps } from '@/interfaces/inputProps';
import React from 'react';

const Input = ({ error, register, id, type, placeholder, label }: IInputProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} {...register} />
      {error && <div role="alert">{error}</div>}
    </div>
  );
};

export default Input;
