import React from 'react';
import styled from '@emotion/styled';
import Mypage from './header/Mypage_header';
import Search from './header/Search_header';
import Login from './header/Login_header';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { tokenRefresh } from './header/apis';
import { useDispatch } from 'react-redux';
import Logo from './header/Logo';

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
      <Logo />
      {router.asPath !== '/search' ? <Search /> : <div></div>}
      {cookies.accessToken ? <Mypage /> : <Login />}
      <MenuList>
        <li>
          <Link href={ROUTES.SIGNUP}>회원가입</Link>
        </li>
        <li>
          <Link href={ROUTES.SURVEY}>테스트</Link>
        </li>
        <li>
          <Link href={ROUTES.CART}>장바구니</Link>
        </li>
        <li>
          <Link href={ROUTES.REVIEW}>커뮤니티</Link>
        </li>
        <li>
          <Link href={ROUTES.MYPAGE.MAIN}>마이페이지</Link>
        </li>
        <li
          onClick={() => {
            setCookies('isAdmin', true);
            setCookies('tokens', {});
          }}
        >
          <Link href={ROUTES.ADMIN.MAIN}>[임시]관리자페이지</Link>
        </li>
      </MenuList>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 58px;
  margin: 0 auto;
  padding: 30px 0;
  gap: 30px;
  align-items: center;
  @media (max-width: 1200px) {
    padding: 16px;
  }
  display: flex;
`;

const MenuList = styled.ul`
  margin: 0 auto;
  display: flex;
  gap: 30px;
`;
