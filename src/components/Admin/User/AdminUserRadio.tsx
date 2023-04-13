import { getRadioUserAdmin, putRadioUserAdmin } from '@/apis/admin/user';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IProps {
  name: string;
  id1: string;
  id2: string;
  label1: string;
  label2: string;
}

const AdminUserRadio = ({ name, id1, id2, label1, label2 }: IProps) => {
  const [userData, setUserData] = useState('');
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getRadioUserAdmin({ router, setUserData, name, dispatch });
  }, []);

  return (
    <div>
      <label htmlFor={id1}>{label1}</label>
      <input
        type="radio"
        id={id1}
        value={id1}
        name={name}
        checked={userData === id1}
        disabled={disabled}
        onChange={(event) => {
          setUserData(event.target.value);
        }}
      />
      <label htmlFor={id2}>{label2}</label>
      <input
        type="radio"
        id={id2}
        value={id2}
        name={name}
        checked={userData === id2}
        disabled={disabled}
        onChange={(event) => {
          setUserData(event.target.value);
        }}
      />
      {disabled ? (
        <button
          onClick={() => {
            setDisabled(false);
          }}
        >
          수정
        </button>
      ) : (
        <button
          onClick={async () => {
            putRadioUserAdmin({ router, name, userData, dispatch });
            await setDisabled(true);
          }}
        >
          완료
        </button>
      )}
    </div>
  );
};

export default AdminUserRadio;
