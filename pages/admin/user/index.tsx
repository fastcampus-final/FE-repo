import UserTable from '@/components/Admin/User/UserTable';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import React from 'react';

const User = () => {
  return (
    <div>
      <PageTitle title="사용자 관리" />
      <UserTable />
    </div>
  );
};
export default withAuth(User);
