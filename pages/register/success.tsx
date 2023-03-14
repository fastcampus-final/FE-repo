import React from 'react';
import Link from 'next/link';
import { getCookie } from '@/utils/cookie';

const success = () => {
  console.log(getCookie('accessToken'));
  return (
    <div>
      <div>회원가입이 성공했습니다.</div>
      <Link href="/survey">
        <div>여행그룹 추천받기</div>
      </Link>
      <Link href="/">
        <div>건너뛰기</div>
      </Link>
    </div>
  );
};

export default success;
