import { getRoleUserData, patchRoleAdmin, patchRoleUser } from '@/apis/admin/user';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const RoleChange = () => {
  const [userData, setUserData] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getRoleUserData({ router, setUserData, setUserEmail, dispatch });
  }, []);

  return (
    <div>
      <label htmlFor="ROLE_USER">사용자</label>
      <input
        type="radio"
        id="ROLE_USER"
        value="ROLE_USER"
        name="role"
        checked={userData === 'ROLE_USER'}
        disabled={disabled}
        onChange={(event) => {
          setUserData(event.target.value);
        }}
      />
      <label htmlFor="ROLE_ADMIN">관리자</label>
      <input
        type="radio"
        id="ROLE_ADMIN"
        value="ROLE_ADMIN"
        name="role"
        checked={userData === 'ROLE_ADMIN'}
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
            if (userData === 'ROLE_ADMIN') {
              patchRoleAdmin({ userEmail, setDisabled, dispatch });
            } else if (userData === 'ROLE_USER') {
              patchRoleUser({ userEmail, setDisabled, dispatch });
            }
          }}
        >
          완료
        </button>
      )}
    </div>
  );
};

export default RoleChange;
