import React from 'react';
import Link from 'next/link';
import { getCookie } from '@/utils/cookie';
import { ROUTES } from '@/constants/routes';
import { MESSAGES } from '@/constants/messages';

const success = () => {
  console.log(getCookie('tokens'));
  return (
    <div>
      <div>{MESSAGES.SIGNUP.COMPLETE_SIGNUP}</div>
      <Link href={ROUTES.SURVEY}>
        <div>여행그룹 추천받기</div>
      </Link>
      <Link href={ROUTES.HOME}>
        <div>건너뛰기</div>
      </Link>
    </div>
  );
};

export default success;
