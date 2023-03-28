import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import React from 'react';

const PopularProduct = () => {
  return (
    <div>
      <PageTitle title="인기 여행지 관리" />
    </div>
  );
};

export default withAuth(PopularProduct);
