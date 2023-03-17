import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Image from '../common/Image';

const Header = () => {
  return (
    <Container>
      <Link href={ROUTES.HOME}>
        <Image src="./logo-full.png" alt="고투게더 로고" width="200px" />
      </Link>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 30px;
`;
