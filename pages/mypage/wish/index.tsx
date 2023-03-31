import PageTitle from '@/components/common/PageTitle';
import styled from '@emotion/styled';
import React from 'react';

const MyWish = () => {
  return (
    <Container>
      <PageTitle title="나의 관심 상품" />
    </Container>
  );
};

export default MyWish;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;
