import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import React from 'react';

const Banner = () => {
  return (
    <div>
      <PageTitle title="배너 관리" />
    </div>
  );
};

export default withAuth(Banner);
