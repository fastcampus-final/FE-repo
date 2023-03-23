import React from 'react';
import styled from '@emotion/styled';
import Logo from './header/Logo_header';
import Mypage from './header/Mypage_header';
import Search from './header/Search_header';
import Login from './header/Login_header';
import { useRouter } from 'next/router';
import { instance } from '@/api/instance';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { useCookies } from 'react-cookie';

const Header = () => {
  const [cookies, setCookies, removeCookies] = useCookies();

  setInterval(async () => {
    if (cookies.accessToken && cookies.refreshToken) {
      await instance({
        method: 'POST',
        url: 'https://www.go-together.store:443/user/refresh',
        data: {
          refreshToken: cookies.refreshToken,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            removeCookie('accessToken');
            setCookies('accessToken', res.data.data.accessToken);
          } else
            instance({
              method: 'POST',
              url: 'https://www.go-together.store:443/user/logout',
              data: {
                refreshToken: cookies.refreshToken,
              },
            })
              .then((res) => {
                if (res.data.code === 200) {
                  alert('로그아웃이 완료되었습니다.');
                  removeCookie('accessToken');
                  removeCookie('refreshToken');
                  router.push('/');
                }
              })
              .catch((error) => {
                console.log(error);
              });
        })
        .catch((error) => {
          console.log(error);
          instance({
            method: 'POST',
            url: 'https://www.go-together.store:443/user/logout',
            data: {
              refreshToken: cookies.refreshToken,
            },
          })
            .then((res) => {
              if (res.data.code === 200) {
                alert('로그아웃이 완료되었습니다.');
                removeCookie('accessToken');
                removeCookie('refreshToken');
                router.push('/');
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
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
          <Link href={ROUTES.HOME}>메인</Link>
        </li>
        <li>
          <Link href={ROUTES.LOGIN}>로그인</Link>
        </li>
        <li>
          <Link href={ROUTES.SIGNUP}>회원가입</Link>
        </li>
        <li>
          <Link href={ROUTES.PRODUCT}>상품목록</Link>
        </li>
        <li>
          <Link href={ROUTES.SEARCH}>검색</Link>
        </li>
        <li>
          <Link href={ROUTES.SURVEY}>여행유형테스트</Link>
        </li>
        <li>
          <Link href={ROUTES.CART}>장바구니</Link>
        </li>
        <li>
          <Link href={ROUTES.MYPAGE.MAIN}>마이페이지</Link>
        </li>
        <li onClick={() => setCookies('isAdmin', true)}>
          <Link href={ROUTES.ADMIN.MAIN}>관리자페이지</Link>
        </li>
      </MenuList>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
`;

const MenuList = styled.ul`
  width: 1500px;
  margin: 0 auto;
  display: flex;
  gap: 10px;
`;
