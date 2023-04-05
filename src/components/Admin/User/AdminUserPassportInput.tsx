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

const AdminUserPassportInput = ({ id, label, type }: IProps) => {
  const [userData, setUserData] = useState({
    passportFirstName: '',
    passportLastName: '',
  });

  const [firstDisabled, setFirstDisabled] = useState(true);
  const [lastDisabled, setlastDisabled] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  // console.log(userData);

  useEffect(() => {
    instance({
      method: 'GET',
      url: `https://www.go-together.store:443/admin/user/${router.query.id}`,
    })
      .then((res) => {
        // console.log(res.data[`${id}`]);
        setUserData({
          passportFirstName: res.data.passportFirstName,
          passportLastName: res.data.passportLastName,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
              await instance({
                method: 'PUT',
                url: `https://www.go-together.store:443/admin/userDetail/${router.query.id}`,
                data: {
                  passportFirstName: userData.passportFirstName,
                },
              })
                .then((res) => {
                  console.log(res);
                  setFirstDisabled(true);
                })
                .catch((error) => {
                  console.log(error);
                });
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
              await instance({
                method: 'PATCH',
                url: `https://www.go-together.store:443/admin/userDetail/${router.query.id}`,
                data: {
                  passportLastName: userData.passportLastName,
                },
              })
                .then((res) => {
                  console.log(res);
                  setlastDisabled(true);
                })
                .catch((error) => {
                  console.log(error);
                });
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
