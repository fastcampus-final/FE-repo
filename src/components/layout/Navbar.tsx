import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <Container>
      <ul>
        <li>
          <Link href={ROUTES.HOME}>메인</Link>
        </li>
        <li>
          <Link href={ROUTES.PRODUCT}>상품목록</Link>
        </li>
        <li>
          <Link href={ROUTES.SEARCH}>검색</Link>
        </li>
      </ul>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  border: 1px solid black;
`;
