import React from 'react';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import Image from '@/components/common/Image';
import styled from '@emotion/styled';

const Logo = () => {
  return (
    <Link href={ROUTES.HOME}>
      <Image src="./logo.svg" alt="고투게더 로고" width="154px" />
    </Link>
  );
};

export default Logo;
