import { ROUTES } from '@/constants/routes';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MyCartHeader = () => {
  return (
    <Container>
      <Link href={ROUTES.MYPAGE.ORDER}>
        <Image src="/icons/HeaderCart.svg" alt="예약확인페이지로 이동" width={24} height={24} />
      </Link>
    </Container>
  );
};

export default MyCartHeader;

const Container = styled.span`
  margin-left: 10px;
`;
