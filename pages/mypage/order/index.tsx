import PageTitle from '@/components/common/PageTitle';
import styled from '@emotion/styled';
import React from 'react';

const MyOrder = () => {
  return (
    <Container>
      <PageTitle title="나의 예약 내역" />
    </Container>
  );
};

export default MyOrder;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;
