import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface IProps {
  href: string;
  src: string;
  alt: string;
  ko: string;
  now: string;
  include?: string;
}

const Tab = ({ href, src, alt, ko, now, include }: IProps) => {
  const router = useRouter();

  return (
    <div>
      <Link href={href}>
        {router.asPath === '/' && ko === '홈' ? (
          <Container>
            <Image src={now} alt={alt} width={24} height={24} />
            <Name>{ko}</Name>
          </Container>
        ) : (
          <Container>
            <Image
              src={router.asPath.includes(include as string) ? now : src}
              alt={alt}
              width={24}
              height={24}
            />
            <Name>{ko}</Name>
          </Container>
        )}
      </Link>
    </div>
  );
};

export default Tab;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;
