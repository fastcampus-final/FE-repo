import React from 'react';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import Image from '@/components/common/Image';

const Logo = () => {
  return (
    <div>
      <Link href={ROUTES.HOME}>
        <Image src="./logo-full.png" alt="고투게더 로고" width="200px" />
      </Link>
    </div>
  );
};

export default Logo;
