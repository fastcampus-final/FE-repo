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
      {router.asPath !== '/login' ? (
        <Menus>
          {router.asPath !== '/search' ? <Search /> : <div></div>}
          <MyCartHeader />
          <MenuList />
        </Menus>
      ) : (
        <div></div>
      )}
      {/* <MenuList>
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
        </MenuList>*/}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  box-sizing: border-box;
  width: 1200px;
  margin: 0 auto;
  padding: 30px;
  gap: 80px;
  align-items: center;
  @media (max-width: 1200px) {
    padding: 16px;
  }
  display: flex;
  justify-content: space-between;
  position: fixed;
  background-color: white;
  z-index: 9999;
`;

const Menus = styled.div`
  display: flex;
  align-items: center;
`;

// const MenuList = styled.ul`
//   margin: 0 auto;
//   display: flex;
//   gap: 30px;
// `;
