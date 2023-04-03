import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {
  pathname: string;
}

const CommunityRouter = ({ pathname }: Props) => {
  const router = useRouter();
  const [routerReview, setRouterReview] = useState(false);
  const [routerNotice, setRouterNotice] = useState(false);
  useEffect(() => {
    if (pathname.includes('review')) {
      setRouterReview(true);
    } else {
      setRouterNotice(true);
    }
  }, []);
  return (
    <RouterContent>
      <RouterButton isRouter={routerReview} onClick={() => router.push('/community/review')}>
        여행후기
      </RouterButton>
      <RouterButton isRouter={routerNotice} onClick={() => router.push('/community/notice')}>
        알려드려요
      </RouterButton>
    </RouterContent>
  );
};

export default CommunityRouter;

const RouterContent = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
  @media screen and (min-width: 1000px) {
    padding: 0 10rem;
  }
`;

const RouterButton = styled.button<{ isRouter: boolean }>`
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${(props) => (props.isRouter ? '#0CB1F3' : '#b7b7b7')};
`;
