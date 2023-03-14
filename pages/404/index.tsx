import React from 'react';
import Lottie from 'react-lottie';
import lottieData from '@/../public/404page.json';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieData,
  };
  return (
    <NotFoundContent>
      <LottieContent>
        <Lottie options={lottieOptions} height={300} width={400} />
      </LottieContent>
      <TextContent>
        <h2>페이지를 찾을 수 없습니다.</h2>
        <p>
          페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다. <br />
          입력하신 주소가 정확한지 다시 한 번 확인해주세요.{' '}
        </p>
        <button onClick={() => router.push('/')} className="main">
          메인으로 {'>'}
        </button>
        <button onClick={() => router.back()} className="before">
          이전으로 {'>'}
        </button>
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
  button {
    text-decoration: none;
    padding: 0.5rem 0.7rem 0.4rem;
    border-radius: 5px;
    margin-right: 1rem;
  }
  .main {
    background-color: #4393ff;
    border: 2px solid #4393ff;
    color: #fff;
  }
  .before {
    border: 2px solid #4393ff;
    color: #4393ff;
    background-color: #fff;
  }
`;

export default NotFound;
