import { instance } from '@/apis/instance';
import { alterModal } from '@/components/SignIn/function';
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
              await instance({
                method: 'PUT',
                url: `https://www.go-together.store:443/admin/userDetail/${router.query.id}`,
                data: {
                  [id]: userData,
                },
              })
                .then((res) => {
                  return res;
                })
                .catch(() => {
                  alterModal(
                    '서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요',
                    dispatch,
                  );
                });
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
