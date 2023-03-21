// import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import React from 'react';
import styled from '@emotion/styled';
import NavList from './nav/NavList';

const text = [
  {
    title: '여행 큐레이션',
    data: [
      {
        title: '여행그룹 추천받기',
        href: '/',
      },
      {
        title: '나의 여행 유형 테스트',
        href: '/',
      },
    ],
  },
  {
    title: '그룹별 여행',
    data: [
      {
        title: '5070끼리',
        href: '/',
      },
      {
        title: '남자끼리',
        href: '/',
      },
      {
        title: '여자끼리',
        href: '/',
      },
      {
        title: '가족끼리',
        href: '/',
      },
      {
        title: '누구든지',
        href: '/',
      },
    ],
  },
  {
    title: '지역별 여행',
    data: [
      {
        title: '동남아/태평양',
        data: [
          {
            title: '동남아시아',
            href: '/',
          },
          {
            title: '괌&사이판&하와이',
            href: '/',
          },
          {
            title: '호주&뉴질랜드',
            href: '/',
          },
        ],
      },
      {
        title: '인도/중앙아시아',
        data: [
          {
            title: '인도&주변국',
            href: '/',
          },
          {
            title: '중앙아시아',
            href: '/',
          },
        ],
      },
      {
        title: '아프리카/중동',
        data: [
          {
            title: '동남아프리카',
            href: '/',
          },
          {
            title: '북아프리카&중동',
            href: '/',
          },
        ],
      },
      {
        title: '유럽/코카서스',
        data: [
          {
            title: '코카서스',
            href: '/',
          },
          {
            title: '유럽',
            href: '/',
          },
        ],
      },
      {
        title: '중남미/북미',
        data: [
          {
            title: '중남미',
            href: '/',
          },
          {
            title: '북미',
            href: '/',
          },
        ],
      },
      {
        title: '대만/중국/일본',
        data: [
          {
            title: '대만',
            href: '/',
          },
          {
            title: '중국',
            href: '/',
          },
          {
            title: '일본',
            href: '/',
          },
        ],
      },
    ],
  },
  {
    title: '테마별 여행',
    data: [
      {
        title: '문화탐방',
        href: '/',
      },
      {
        title: '골프여행',
        data: [
          {
            title: '유럽/미국/특수지역',
            href: '/',
          },
          {
            title: '태국/라오스/미얀마',
            href: '/',
          },
          {
            title: '필리핀/인도네시아',
            href: '/',
          },
          {
            title: '베트남/캄보디아',
            href: '/',
          },
          {
            title: '싱가폴/기타 동남아',
            href: '/',
          },
          {
            title: '중국/일본/대만',
            href: '/',
          },
        ],
      },
      {
        title: '휴양지',
        href: '/',
      },
      {
        title: '트레킹',
        href: '/',
      },
      {
        title: '성지순례',
        href: '/',
      },
      {
        title: '볼룬투어',
        href: '/',
      },
    ],
  },
  {
    title: '커뮤니티',
    data: [
      {
        title: '여행후기',
        href: '/',
      },
      {
        title: '게시판',
        href: '/',
      },
      {
        title: '자료실',
        href: '/',
      },
      {
        title: '오시는 길',
        href: '/',
      },
    ],
  },
];

const Navbar = () => {
  return (
    <Container>
      <div>
        <FlexUl>
          {text.map((text2) => (
            <li key={text2.title}>
              <div>{text2.title}</div>
              <HoverUl>
                {text2.data.map((text3) => {
                  return (
                    <li key={text3.title}>
                      {text3.data !== undefined ? (
                        <div>
                          <div>{text3.title}</div>
                          <ul>
                            <NavList text={text3.data} />
                          </ul>
                        </div>
                      ) : (
                        <Link href={text3.href}>
                          <div>{text3.title}</div>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </HoverUl>
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
  padding: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

// const MenuList = styled.ul`
//   width: 1500px;
//   margin: 0 auto;
//   display: flex;
//   gap: 10px;
// `;

const FlexUl = styled.ul`
  display: flex;
`;

const HoverUl = styled.ul`
  display: none;
`;
