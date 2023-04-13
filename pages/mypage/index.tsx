import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import GetMyinfo from '@/components/Mypage/GetMyinfo';
import React from 'react';
import styled from '@emotion/styled';
import MyPageNavbar from '@/components/layout/MyPageNavbar';

const Mypage = () => {
  return (
    <Container>
      <MyPageNavbar />
      <MypageWrap>
        <PageTitle title="마이 페이지" />
        <GetMyinfo />
      </MypageWrap>
    </Container>
  );
};

export default withAuth(Mypage);

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1200px;
  gap: 30px;
  box-sizing: border-box;
  padding: 16px 0;
  @media (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
    flex-direction: column-reverse;
  }
  @media (max-width: 1200px) {
    padding: 16px;
  }
`;

const MypageWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;
