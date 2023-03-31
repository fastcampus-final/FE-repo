import PageTitle from '@/components/common/PageTitle';
import styled from '@emotion/styled';
import React from 'react';

const MyReview = () => {
  return (
    <Container>
      <PageTitle title="나의 여행 후기" />
    </Container>
  );
};

export default MyReview;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;
