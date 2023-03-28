import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import React from 'react';

const Order = () => {
  return (
    <div>
      <PageTitle title="예약 관리" />
    </div>
  );
};

export default withAuth(Order);
