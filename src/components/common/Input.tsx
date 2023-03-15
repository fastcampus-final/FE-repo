import React from 'react';

interface IinputProps {
  error: string;
  register: { name: string };
  id: string;
  type: string;
  placeholder?: string;
  label: string;
}

const Input = ({ error, register, id, type, placeholder, label }: IinputProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} {...register} />
      {error && <div role="alert">{error}</div>}
      {id === 'id' && <button>중복확인</button>}
    </div>
  );
};

export default Input;
