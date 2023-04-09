import React from 'react';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href={ROUTES.HOME}>
      <Image src="/logo.svg" alt="고투게더 로고" width={154} height={26} />
    </Link>
  );
};

export default Logo;
