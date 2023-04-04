import { instance } from '@/api/instance';
import withAuth from '@/components/common/PrivateRouter';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const UserDetail = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    birthday: '',
    phoneNumber: '',
    passportFirstName: '',
    passportLastName: '',
    deleteCheck: '',
    gender: '',
    userId: 0,
    sns: '',
    type: '',
    role: '',
  });
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  console.log(userData);

  useEffect(() => {
    instance({
      method: 'GET',
      url: `https://www.go-together.store:443/admin/user/${router.query.id}`,
    })
      .then((res) => {
        console.log(res);
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          value={userData.name}
          disabled={disabled}
          onChange={(event) => {
            setUserData({ ...userData, name: event.target.value });
          }}
        />
      </div>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={userData.email}
          disabled={disabled}
          onChange={(event) => {
            setUserData({ ...userData, email: event.target.value });
          }}
        />
      </div>
      <div>
        <label htmlFor="birthday">생일</label>
        <input
          type="text"
          id="birthday"
          value={userData.birthday}
          disabled={disabled}
          onChange={(event) => {
            setUserData({ ...userData, birthday: event.target.value });
          }}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">연락처</label>
        <input
          type="tel"
          id="phoneNumber"
          value={userData.phoneNumber}
          disabled={disabled}
          onChange={(event) => {
            setUserData({ ...userData, phoneNumber: event.target.value });
          }}
        />
      </div>
      <div>
        <label htmlFor="passport">여권명</label>
        <input
          type="text"
          id="passport"
          value={userData.passportFirstName}
          disabled={disabled}
          onChange={(event) => {
            setUserData({ ...userData, passportFirstName: event.target.value });
          }}
        />
        <input
          type="text"
          id="passport"
          value={userData.passportLastName}
          disabled={disabled}
          onChange={(event) => {
            setUserData({ ...userData, passportLastName: event.target.value });
          }}
        />
      </div>
      <div>
        <label htmlFor="delete">계정 탈퇴</label>
        <input
          type="radio"
          id="delete"
          name="deleteCheck"
          checked={userData.deleteCheck !== 'available'}
          disabled={disabled}
          onChange={(event) => {
            setUserData({ ...userData, name: event.target.value });
          }}
        />
        <label htmlFor="available">사용가능 계정</label>
        <input
          type="radio"
          id="available"
          name="deleteCheck"
          checked={userData.deleteCheck === 'available'}
          disabled={disabled}
          onChange={(event) => {
            setUserData({ ...userData, name: event.target.value });
          }}
        />
      </div>
      <div>
        <label htmlFor="female">여성</label>
        <input
          type="radio"
          id="female"
          checked={userData.gender === 'female'}
          disabled={disabled}
          onChange={(event) => {
            setUserData({ ...userData, gender: event.target.value });
          }}
        />
        <label htmlFor="male">남성</label>
        <input
          type="radio"
          id="male"
          checked={userData.gender === 'male'}
          disabled={disabled}
          onChange={(event) => {
            setUserData({ ...userData, gender: event.target.value });
          }}
        />
      </div>
      <div>
        <label htmlFor="userId">회원번호</label>
        <input type="number" id="userId" value={userData.userId} disabled={disabled} />
      </div>
      <div>
        <label htmlFor="sns">sns 회원가입</label>
        <input type="radio" id="sns" checked={userData.sns === 'sns'} disabled={disabled} />
        <label htmlFor="notSns">고투게더 회원가입</label>
        <input type="radio" id="notSns" checked={userData.sns === 'notSns'} disabled={disabled} />
      </div>
      <div>
        <label htmlFor="type">여행 타입</label>
        <input type="text" id="type" value={userData.type} disabled={disabled} />
      </div>
      <div>
        <label htmlFor="ROLE_USER">사용자</label>
        <input
          type="radio"
          id="ROLE_USER"
          checked={userData.role === 'ROLE_USER'}
          disabled={disabled}
        />
        <label htmlFor="ROLE_ADMIN">관리자</label>
        <input
          type="radio"
          id="ROLE_ADMIN"
          checked={userData.role === 'ROLE_ADMIN'}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default withAuth(UserDetail);
