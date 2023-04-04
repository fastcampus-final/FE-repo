import { instance } from '@/apis/instance';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const RoleChange = () => {
  const [userData, setUserData] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    instance({
      method: 'GET',
      url: `https://www.go-together.store:443/admin/user/${router.query.id}`,
    })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.role);
        setUserEmail(res.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(userData);

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
              instance({
                method: 'PATCH',
                url: `https://www.go-together.store:443/admin/setAdmin/${userEmail}`,
              })
                .then(async (res) => {
                  console.log(res);
                  await setDisabled(true);
                })
                .catch((error) => {
                  console.log(error);
                });
            } else if (userData === 'ROLE_USER') {
              instance({
                method: 'PATCH',
                url: `https://www.go-together.store:443/admin/deprivation/${userEmail}`,
              })
                .then(async (res) => {
                  console.log(res);
                  await setDisabled(true);
                })
                .catch((error) => {
                  console.log(error);
                });
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
