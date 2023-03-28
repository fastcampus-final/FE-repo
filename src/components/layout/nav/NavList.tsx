import { IText } from '@/interfaces/navText';
import Link from 'next/link';
import React from 'react';

const NavList = ({ text }: { text: IText[] }) => {
  return (
    <div>
      {text.map((text1) => {
        return (
          <li key={text1.title}>
            <Link href={text1.href}>
              <div>{text1.title}</div>
            </Link>
          </li>
        );
      })}
    </div>
  );
};

export default NavList;
