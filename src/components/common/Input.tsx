import React from 'react';

interface Props {
  type: string;
  placeholder?: string;
  label?: string;
  id?: string;
  register?: { name: string };
  error?: string;
}

const Input = ({ error, register, id, type, placeholder, label }: Props) => {
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
