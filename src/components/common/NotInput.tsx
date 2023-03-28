import { INotInputProps } from '@/interfaces/notInputProps';
import React from 'react';

const NotInput = ({ id, label, type, value }: INotInputProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} value={value} disabled />
    </div>
  );
};

export default NotInput;
