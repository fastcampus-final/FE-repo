import { instance } from '@/apis/instance';
import { alterModal } from '@/components/SignIn/function';
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
    instance({
      method: 'GET',
      url: `https://www.go-together.store:443/admin/user/${router.query.id}`,
    })
      .then((res) => {
        setUserData(res.data[`${id}`]);
      })
      .catch(() => {
        alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
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
