import { mypageLogout } from '@/apis/mypage/info';
import { ROUTES } from '@/constants/routes';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const MyCartHeader = () => {
  const [cookies, setCookies, removeCookies] = useCookies();
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Container>
      <Link href={ROUTES.CART}>
        <Image src="/icons/HeaderCart.svg" alt="장바구니" width={24} height={24} />
      </Link>
      <Link href={ROUTES.MYPAGE.MAIN}>
        <Image src="/icons/FooterMyBold.svg" alt="마이페이지" width={24} height={24} />
      </Link>
      {cookies.accessToken && cookies.refreshToken ? (
        <LogoutIcon
          width={24}
          height={24}
          onClick={() => {
            mypageLogout(dispatch, router, cookies, removeCookies);
          }}
        />
      ) : (
        <LoginIcon width={24} height={24} onClick={() => router.push(ROUTES.LOGIN)} />
      )}
    </Container>
  );
};

export default MyCartHeader;

const Container = styled.span`
  display: flex;
  margin-left: 20px;
  align-items: center;
  gap: 20px;
`;
