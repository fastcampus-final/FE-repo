import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import React from 'react';

const Review = () => {
  return (
    <div>
      <PageTitle title="여행 후기 관리" />
    </div>
  );
};

export default withAuth(Review);
