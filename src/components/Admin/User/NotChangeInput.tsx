import { getInputUserData } from '@/apis/admin/user';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IProps {
  id: string;
  label: string;
  type: string;
}

const NotChangeInput = ({ id, label, type }: IProps) => {
  const [userData, setUserData] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getInputUserData({ router, setUserData, id, dispatch });
  }, []);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={userData} disabled />
    </div>
  );
};

export default NotChangeInput;
