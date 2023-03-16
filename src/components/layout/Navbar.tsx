import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <Container>
      <MenuList>
        <li>
          <Link href={ROUTES.HOME}>메인</Link>
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
          <Link href={ROUTES.MYPAGE.MYPAGE_MAIN}>마이페이지</Link>
        </li>
      </MenuList>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  border: 1px solid black;
`;

const MenuList = styled.ul`
  display: flex;
  gap: 10px;
`;
