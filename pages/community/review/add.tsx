import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';

import ArrowLeft from '@/../public/icons/arrow-left.svg';

const ReviewAdd = () => {
  const router = useRouter();
  return (
    <AddContent>
      <BackRouter onClick={() => router.back()}>
        <ArrowLeft />
        <p>커뮤니티</p>
      </BackRouter>
    </AddContent>
  );
};

export default ReviewAdd;

const AddContent = styled.div``;

const BackRouter = styled.div`
  display: flex;
  padding: 0 1.5rem;
  svg {
    width: 30px;
    margin-right: 10px;
  }
  p {
    margin: auto 0;
    font-size: 1.3rem;
    color: #878787;
  }
`;
