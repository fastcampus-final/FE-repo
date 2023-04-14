import AdminUserInput from '@/components/Admin/User/AdminUserInput';
import AdminUserPassportInput from '@/components/Admin/User/AdminUserPassportInput';
import AdminUserRadio from '@/components/Admin/User/AdminUserRadio';
import NotChangeInput from '@/components/Admin/User/NotChangeInput';
import RoleChange from '@/components/Admin/User/RoleChange';
import withAuth from '@/components/common/PrivateRouter';
import React from 'react';

const UserDetail = () => {
  return (
    <div>
      <AdminUserInput id="userName" label="이름" type="text" test="^[가-힣]{3,4}$" />
      <NotChangeInput id="userEmail" label="이메일" type="email" />
      <AdminUserInput id="userBirthday" label="생일" type="text" test="^[0-9]{8}$" />
      <AdminUserInput
        id="userPhoneNumber"
        label="연락처"
        type="tel"
        test="^[0-9]{3}[0-9]{3,4}[0-9]{4}$"
      />
      <AdminUserPassportInput id="passport" label="여권명" type="text" />
      <AdminUserRadio
        name="deleteCheck"
        id1="delete"
        id2="available"
        label1="계정 탈퇴"
        label2="사용가능 계정"
      />
      <AdminUserRadio name="userGender" id1="female" id2="male" label1="여성" label2="남성" />
      <NotChangeInput id="userId" label="회원번호" type="number" />
      <NotChangeInput id="userType" label="여행 타입" type="text" />
      <RoleChange />
    </div>
  );
};

export default withAuth(UserDetail);
