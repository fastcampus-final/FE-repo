import React from 'react';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import Image from '@/components/common/Image';

interface Props {
  width: string;
}

const Logo = ({ width }: Props) => {
  return (
    <Link href={ROUTES.HOME}>
      <Image src="./logo.svg" alt="고투게더 로고" width={width} />
    </Link>
  );
};

export default Logo;
