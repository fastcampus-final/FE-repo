import React from 'react';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styled from '@emotion/styled';

const ScrollTop = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Container>
      <Fab color="primary" aria-label="scroll-top" onClick={handleClick} size="small">
        <KeyboardArrowUpIcon />
      </Fab>
    </Container>
  );
};

export default ScrollTop;

const Container = styled.div`
  position: fixed;
  bottom: 5vh;
  right: 7vw;
  z-index: 30;
  @media (max-width: 1200px) {
    bottom: 13vh;
  }
`;
