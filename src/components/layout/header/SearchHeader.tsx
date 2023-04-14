import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import styled from '@emotion/styled';
import Image from 'next/image';

const Search = () => {
  return (
    <Link href={{ pathname: ROUTES.PRODUCT }}>
      <Container>
        <TextContainer>
          <Input />
        </TextContainer>
        <Image src="/icons/HeaderSearch.svg" alt="검색창 이동" width={24} height={24} />
      </Container>
    </Link>
  );
};

export default Search;

const TextContainer = styled.span`
  @media (max-width: 1200px) {
    display: none;
  }
`;
const Input = styled.input`
  width: 42vw;
  border: 0;
  height: 25px;
  background-color: inherit;
  outline: none;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f3f5;
  height: 40px;
  padding: 0 0 0 10px;
  width: 45vw;
  border-radius: 8px;
  @media (max-width: 1200px) {
    background-color: white;
    width: fit-content;
  }
`;
