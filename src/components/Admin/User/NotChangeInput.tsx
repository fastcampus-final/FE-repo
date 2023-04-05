import { instance } from '@/apis/instance';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface IProps {
  id: string;
  label: string;
  type: string;
}

const NotChangeInput = ({ id, label, type }: IProps) => {
  const [userData, setUserData] = useState('');
  const router = useRouter();
  console.log(userData);

  useEffect(() => {
    instance({
      method: 'GET',
      url: `https://www.go-together.store:443/admin/user/${router.query.id}`,
    })
      .then((res) => {
        // console.log(res.data[`${id}`]);
        setUserData(res.data[`${id}`]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={userData} disabled />
    </div>
  );
};

export default NotChangeInput;
