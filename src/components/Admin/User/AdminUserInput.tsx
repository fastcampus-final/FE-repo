import { getUserAdminData, putUserAdminData } from '@/apis/admin/user';
import { alterModal } from '@/utils/check';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IProps {
  id: string;
  label: string;
  type: string;
  test: string;
}

const AdminUserInput = ({ id, label, type, test }: IProps) => {
  const [userData, setUserData] = useState('');
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserAdminData({ router, setUserData, id, dispatch });
  }, []);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={userData}
        disabled={disabled}
        onChange={(event) => {
          setUserData(event.target.value);
        }}
      />
      {disabled ? (
        <button
          onClick={async () => {
            await setDisabled(false);
          }}
        >
          수정
        </button>
      ) : (
        <button
          onClick={async () => {
            if (new RegExp(test).test(userData)) {
              await putUserAdminData({ router, id, userData, dispatch });
              await setDisabled(true);
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

export default AdminUserInput;
