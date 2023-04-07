import Image from '@/components/common/Image';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import AsideNav from '../nav/AsideNav';

interface ICssProps {
  height: number;
  width?: number;
}

const MenuList = () => {
  const [open, setOpen] = useState(false);
  const [windowH, setWindowH] = useState(screen.height);
  const [windowW, setWindowW] = useState(screen.width);

  window.onresize = () => {
    setWindowH(screen.height);
    setWindowW(screen.width);
  };

  const asideHeight = windowH - 58 - 84;

  useEffect(() => {
    if (windowW > 1200) {
      document.body.style.removeProperty('overflow');
    }
  }, [windowW]);

  return (
    <div>
      <Container
        onClick={() => {
          setOpen(!open);
          if (!open) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.removeProperty('overflow');
          }
        }}
      >
        <Image src="/icons/HeaderMenu.svg" alt="메뉴" width="24" height="24" cursorPointer={true} />
      </Container>
      {open && (
        <Background height={asideHeight} width={windowW}>
          <Aside height={asideHeight}>
            <AsideNav />
          </Aside>
        </Background>
      )}
    </div>
  );
};

export default MenuList;

const Container = styled.div`
  position: relative;
  margin-left: 10px;
  @media (min-width: 1201px) {
    display: none;
  }
`;

const Aside = styled.div`
  z-index: 9999;
  background-color: white;
  position: absolute;
  height: ${(props: ICssProps) => props.height}px;
  width: 230px;
  right: -16px;
  box-sizing: border-box;
  top: -1px;
  overflow: scroll;
`;

const Background = styled.div`
  position: absolute;
  z-index: 9998;
  height: ${(props: ICssProps) => props.height}px;
  right: 0;
  top: 59px;
  width: ${(props) => props.width}px;
  background-color: rgba(0, 0, 0, 0.3);
  @media (min-width: 1201px) {
    display: none;
  }
`;
