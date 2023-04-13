import { getOneUserAdminData, putPassportFirst, putPassportLast } from '@/apis/admin/user';
import { alterModal } from '@/utils/check';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IProps {
  id: string;
  label: string;
  type: string;
}

const AdminUserPassportInput = ({ id, label, type }: IProps) => {
  const [userData, setUserData] = useState({
    passportFirstName: '',
    passportLastName: '',
  });

  const [firstDisabled, setFirstDisabled] = useState(true);
  const [lastDisabled, setlastDisabled] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getOneUserAdminData({ router, setUserData, dispatch });
  }, []);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={userData.passportFirstName}
        disabled={firstDisabled}
        onChange={(event) => {
          setUserData({ ...userData, passportFirstName: event.target.value });
        }}
      />
      {firstDisabled ? (
        <button
          onClick={async () => {
            await setFirstDisabled(false);
          }}
        >
          수정
        </button>
      ) : (
        <button
          onClick={async () => {
            if (/^[A-Z]+$/.test(userData.passportFirstName)) {
              putPassportFirst({ router, userData, setFirstDisabled, dispatch });
            } else {
              alterModal('형식에 맞지 않습니다. 바꿔주십시오', dispatch);
            }
          }}
        >
          완료
        </button>
      )}
      <input
        type={type}
        id={id}
        value={userData.passportLastName}
        disabled={lastDisabled}
        onChange={(event) => {
          setUserData({ ...userData, passportLastName: event.target.value });
        }}
      />
      {lastDisabled ? (
        <button
          onClick={async () => {
            await setlastDisabled(false);
          }}
        >
          수정
        </button>
      ) : (
        <button
          onClick={async () => {
            if (/^[A-Z]+$/.test(userData.passportLastName)) {
              await putPassportLast({ router, userData, setlastDisabled, dispatch });
            } else {
              alterModal('형식에 맞지 않습니다. 바꿔주십시오', dispatch);
            }
          }}
        >
          완료
        </button>
      )}
    </div>
  );
};

export default AdminUserPassportInput;
