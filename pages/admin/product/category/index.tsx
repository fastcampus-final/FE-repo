import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import React from 'react';

const ProductCategory = () => {
  return (
    <div>
      <PageTitle title="상품 카테고리 관리" />
    </div>
  );
};

export default withAuth(ProductCategory);
