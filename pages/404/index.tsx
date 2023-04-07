import React from 'react';
import Lottie from 'lottie-react';
import lottieData from '@/../public/lotties/404page.json';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

const NotFound = () => {
  const router = useRouter();

  return (
    <NotFoundContent>
      <LottieContent>
        <Lottie animationData={lottieData} loop={true} autoPlay={true} />
      </LottieContent>
      <TextContent>
        <h2>페이지를 찾을 수 없습니다.</h2>
        <p>
          페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다. <br />
          입력하신 주소가 정확한지 다시 한 번 확인해주세요.{' '}
        </p>
        <Button variant="contained" onClick={() => router.push('/')}>
          메인으로 {'>'}
        </Button>
        <Button variant="outlined" onClick={() => router.back()}>
          이전으로 {'>'}
        </Button>
      </TextContent>
    </NotFoundContent>
  );
};

const NotFoundContent = styled.div`
  display: flex;
  justify-content: center;
`;

const LottieContent = styled.div`
  margin: 0;
  width: 400px;
  height: 300px;
`;

const TextContent = styled.div`
  margin: auto 0;
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
  p {
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
`;

export default NotFound;
