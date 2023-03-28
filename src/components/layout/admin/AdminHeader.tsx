import React from 'react';
import Image from '@/components/common/Image';
import { ROUTES } from '@/constants/routes';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const AdminHeader = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleLogout = async () => {
    removeCookie('isAdmin');
    removeCookie('accessToken');
    removeCookie('refreshToken');
    await router.replace('/');
    router.reload();
  };

  return (
    <Container>
      <Link href={ROUTES.ADMIN.MAIN}>
        <Image src="./../logo.svg" alt="고투게더 로고" width="140px" padding="16px 0 10px" />
      </Link>
      <Button onClick={handleLogout}>로그아웃</Button>
    </Container>
  );
};

export default AdminHeader;

const Container = styled.div`
  padding: 6px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: 8vh;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
`;
