import React from 'react';
import styled from '@emotion/styled';
import Search from './header/SearchHeader';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { tokenRefresh } from './header/apis';
import { useDispatch } from 'react-redux';
import Logo from './header/Logo';
import MyCartHeader from './header/MyCartHeader';
import MenuList from './header/MenuList';
import Navbar from './Navbar';

const Header = () => {
  const [cookies, setCookies, removeCookies] = useCookies();
  const dispatch = useDispatch();

  setInterval(async () => {
    if (cookies.accessToken && cookies.refreshToken) {
      await tokenRefresh(router, dispatch, cookies, removeCookies, setCookies);
    }
  }, 1500000);

  const router = useRouter();

  return (
    <Container>
      <HeaderContainer>
        <Logo />
        {router.asPath !== '/login' ? (
          <Menus>
            {router.asPath !== '/search' ? <Search /> : <div></div>}
            <MyCartHeader />
            <MenuList />
          </Menus>
        ) : (
          <div></div>
        )}
      </HeaderContainer>
      <NavContainer>
        <Navbar />
      </NavContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background-color: white;
  height: 120px;
  position: fixed;
  z-index: 9999;
  @media (max-width: 1200px) {
    height: fit-content;
  }
`;

const HeaderContainer = styled.div`
  box-sizing: border-box;
  height: 58px;
  margin: 0 auto;
  padding: 30px;
  gap: 80px;
  align-items: center;
  @media (max-width: 1200px) {
    padding: 16px;
  }
  display: flex;
  justify-content: space-between;
  background-color: white;
  width: 100vw;
`;

const Menus = styled.div`
  display: flex;
  align-items: center;
`;

const NavContainer = styled.ul`
  display: flex;
  padding: 0 30px;
  @media (max-width: 1200px) {
    display: none;
  }
`;
