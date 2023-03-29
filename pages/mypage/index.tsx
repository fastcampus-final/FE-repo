import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import GetMyinfo from '@/components/Mypage/GetMyinfo';
import Logout from '@/components/Mypage/Logout';
import MyPageLink from '@/components/Mypage/MyPageLink';
import Withdrawal from '@/components/Mypage/Withdrawal';
import { ROUTES } from '@/constants/routes';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import styled from '@emotion/styled';

const index = () => {
  const [modal, setmodal] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies();
  console.log(cookies);

  return (
    <div>
      <Title>
        <PageTitle title="마이페이지" />
      </Title>
      <GetMyinfo />
      <MyPageLink title="관심상품(위시리스트)" link="/mypage/wish" />
      <MyPageLink title="여행 히스토리(나의 여행)" link={ROUTES.MYPAGE.REVIEW} />
      <MyPageLink title="나의 여행 유형 테스트 이력" link={ROUTES.SURVEY} />
      <Withdrawal modal={modal} setmodal={setmodal} />
      <Logout />
    </div>
  );
};

export default withAuth(index);

const Title = styled.h1`
  position: relative;
  top: 48px;
`;
