import React from 'react';
import Lottie from 'lottie-react';
import LoadingLottie from '@/../public/lotties/loading-plane.json';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Loading = () => {
  const loading = useSelector((state: RootState) => state.loading);
  if (loading === false) return null;

  return (
    <StyledLoading>
      <Lottie animationData={LoadingLottie} loop={true} />
    </StyledLoading>
  );
};

export default Loading;

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1.5px);

  div {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
