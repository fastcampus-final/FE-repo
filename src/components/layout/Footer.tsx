import React from 'react';
import styled from '@emotion/styled';
import Tab from './mobileNav/Tab';

const Footer = () => {
  return (
    <Container>
      <Tab
        href="/"
        now="/icons/FooterHomeBold.svg"
        alt="홈으로"
        ko="홈"
        src="/icons/FooterHome.svg"
      />
      <Tab
        href="/search"
        now="/icons/FooterSearchBold.svg"
        alt="검색으로"
        ko="검색"
        src="/icons/FooterSearch.svg"
        include="search"
      />
      <Tab
        href="/community/review"
        now="/icons/FooterCommunityBold.svg"
        alt="후기로"
        ko="커뮤니티"
        src="/icons/FooterCommunity.svg"
        include="community"
      />
      <Tab
        href="/mypage"
        now="/icons/FooterMyBold.svg"
        alt="내 정보로"
        ko="마이"
        src="/icons/FooterMy.svg"
        include="mypage"
      />
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  display: none;
  @media (max-width: 1200px) {
    display: flex;
    border-top: 1px solid #dadada;
    position: fixed;
    bottom: 0;
    height: 84px;
    background-color: white;
    width: 100%;
    justify-content: space-evenly;
    box-sizing: border-box;
    padding-top: 10px;
    z-index: 9999;
  }
`;
