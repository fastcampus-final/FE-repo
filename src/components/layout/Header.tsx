import React from 'react';
import styled from '@emotion/styled';
import Search from './header/SearchHeader';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { tokenRefresh } from '../../apis/layout';
import { useDispatch } from 'react-redux';
import Logo from './header/Logo';
import MyCartHeader from './header/MyCartHeader';
import MenuList from './header/MenuList';
import Navbar from './Navbar';

const Header = () => {
  const [cookies, setCookies, removeCookies] = useCookies();
  const dispatch = useDispatch();
  const router = useRouter();

  setInterval(async () => {
    if (cookies.accessToken && cookies.refreshToken) {
      await tokenRefresh(router, dispatch, cookies, removeCookies, setCookies);
    }
  }, 1000000);

  return (
    <Container>
      <HeaderContainer>
        <Logo />
        {router.asPath !== '/login' && (
          <Menus>
            {router.asPath !== '/product' && <Search />}
            <MyCartHeader />
            <MenuList />
          </Menus>
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
  width: 100%;
  height: 150px;
  position: fixed;
  z-index: 9999;
  @media (max-width: 1200px) {
    height: fit-content;
  }
`;

const HeaderContainer = styled.div`
  width: 1200px;
  height: 80px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  align-items: center;
  background-color: white;
  @media (max-width: 1200px) {
    padding: 16px;
  }
`;

const Menus = styled.div`
  display: flex;
  align-items: center;
`;

const NavContainer = styled.ul`
  display: flex;
  padding: 0 30px;
  width: 1200px;
  margin: 0 auto;
  @media (max-width: 1200px) {
    display: none;
  }
`;
