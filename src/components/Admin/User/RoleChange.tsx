import { instance } from '@/apis/instance';
import { alterModal } from '@/components/SignIn/function';
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
    instance({
      method: 'GET',
      url: `https://www.go-together.store:443/admin/user/${router.query.id}`,
    })
      .then((res) => {
        setUserData(res.data.role);
        setUserEmail(res.data.email);
      })
      .catch(() => {
        alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
      });
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
              instance({
                method: 'PATCH',
                url: `https://www.go-together.store:443/admin/setAdmin/${userEmail}`,
              })
                .then(async () => {
                  await setDisabled(true);
                })
                .catch(() => {
                  alterModal(
                    '서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요',
                    dispatch,
                  );
                });
            } else if (userData === 'ROLE_USER') {
              instance({
                method: 'PATCH',
                url: `https://www.go-together.store:443/admin/deprivation/${userEmail}`,
              })
                .then(async () => {
                  await setDisabled(true);
                })
                .catch(() => {
                  alterModal(
                    '서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요',
                    dispatch,
                  );
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
