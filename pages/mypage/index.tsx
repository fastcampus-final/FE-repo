import PageTitle from '@/components/common/PageTitle';
import GetMyinfo from '@/components/Mypage/GetMyinfo';
import Logout from '@/components/Mypage/Logout';
import MyPageLink from '@/components/Mypage/MyPageLink';
import Withdrawal from '@/components/Mypage/Withdrawal';
import { MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { getCookie } from '@/utils/cookie';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';

const index = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!getCookie('accessToken') && !getCookie('refreshToken')) {
      alert(MESSAGES.INVALID_AUTH);
      router.push('/login');
      // console.log(getCookie('tokens'));
    }
  }, []);

  return (
    <div>
      <PageTitle title="마이페이지" />
      <GetMyinfo />
      <MyPageLink title="관심상품(위시리스트)" link="/mypage/wish" />
      <MyPageLink title="여행 히스토리(나의 여행)" link={ROUTES.MYPAGE.REVIEW} />
      <MyPageLink title="나의 여행 유형 테스트 이력" link={ROUTES.SURVEY} />
      <Withdrawal modal={modal} setmodal={setModal} />
      <Logout />
    </div>
  );
};

export default index;
