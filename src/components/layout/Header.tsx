import React from 'react';
import styled from '@emotion/styled';
import Logo from './header/Logo';
import Mypage from './header/Mypage_header';
import Search from './header/Search_header';
import Login from './header/Login_header';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { tokenRefresh } from './header/apis';
import { useDispatch } from 'react-redux';

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
      <Logo width="154px" />
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
  margin: 0 auto;
  padding: 16px;
`;

const MenuList = styled.ul`
  margin: 0 auto;
  display: flex;
  gap: 30px;
`;
