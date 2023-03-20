import Link from 'next/link';
import React from 'react';

interface Props {
  title: string;
  link: string;
}

const MyPageLink = ({ title, link }: Props) => {
  return (
    <div>
      <Link href={link}>
        <div>{title}</div>
      </Link>
    </div>
  );
};

export default MyPageLink;
