// import { ROUTES } from '@/constants/routes';
import React from 'react';
import styled from '@emotion/styled';
import { group } from '@/constants/navGroup';
import FlexGroup from './nav/FlexGroup';

const Navbar = () => {
  return (
    <Container>
      <div>
        <FlexUl>
          {group.map((flexGroup) => (
            <li key={flexGroup.title}>
              <FlexGroup flexgroup={flexGroup} />
            </li>
          ))}
        </FlexUl>
      </div>
      {/* <MenuList>
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
          <Link href={ROUTES.MYPAGE.MYPAGE_MAIN}>마이페이지</Link>
        </li>
      </MenuList> */}
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const FlexUl = styled.ul`
  display: flex;
  width: 1200px;
  margin: 0 auto;
  padding: 30px;
`;

const HoverUl = styled.ul`
  display: none;
`;
