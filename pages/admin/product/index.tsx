import React from 'react';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';
import PageTitle from '@/components/common/PageTitle';

const Product = () => {
  return (
    <Container>
      <PageTitle title="상품 관리" />
    </Container>
  );
};

export default withAuth(Product);

const Container = styled.div`
  width: 100%;
  height: 700px;
`;
