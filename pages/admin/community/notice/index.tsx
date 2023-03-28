import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import React from 'react';

const Notice = () => {
  return (
    <div>
      <PageTitle title="공지사항 관리" />
    </div>
  );
};

export default withAuth(Notice);
