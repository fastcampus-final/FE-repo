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

  const handleLogout = () => {
    removeCookie('isAdmin');
    router.push('/');
  };

  return (
    <Container>
      <Link href={ROUTES.ADMIN.MAIN}>
        <Image src="../logo-full.png" alt="고투게더 로고" width="140px" padding="16px 0 10px" />
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
  width: 1920px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;
