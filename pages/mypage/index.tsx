import PageTitle from '@/components/common/PageTitle';
import GetMyinfo from '@/components/mypage_myinfo/GetMyinfo';
import MyPageLink from '@/components/mypage_myinfo/MyPageLink';
import Withdrawal from '@/components/mypage_myinfo/Withdrawal';
import { ROUTES } from '@/constants/routes';
import React from 'react';

const index = () => {
  return (
    <div>
      <PageTitle title="마이페이지" />
      <GetMyinfo />
      <MyPageLink title="관심상품(위시리스트)" link="/mypage/wish" />
      <MyPageLink title="여행 히스토리(나의 여행)" link={ROUTES.MYPAGE.MYPAGE_REVIEW} />
      <MyPageLink title="나의 여행 유형 테스트 이력" link={ROUTES.SURVEY} />
      <Withdrawal />
    </div>
  );
};

export default index;
