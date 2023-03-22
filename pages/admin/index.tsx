import React from 'react';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';

const Admin = () => {
  return <Container>Admin</Container>;
};

export default withAuth(Admin);

const Container = styled.div``;
