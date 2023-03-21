import React from 'react';

interface Props {
  id: string;
  label: string;
  type: string;
  value: string;
}

const NotInput = ({ id, label, type, value }: Props) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} value={value} disabled />
    </div>
  );
};

export default NotInput;
