import React from 'react';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';

const Product = () => {
  return <Container>Product</Container>;
};

export default withAuth(Product);

const Container = styled.div`
  width: 100%;
  height: 700px;
`;
