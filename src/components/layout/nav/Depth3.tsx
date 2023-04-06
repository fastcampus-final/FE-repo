import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';

interface IDataProps {
  categoryName: string;
  categoryId: number;
}

interface IProps {
  data: IDataProps;
}

const Depth3 = ({ data }: IProps) => {
  const router = useRouter();

  return (
    <ThreeDepth
      onClick={() => {
        router.push('/login');
      }}
    >
      {data.categoryName}
    </ThreeDepth>
  );
};

export default Depth3;

const ThreeDepth = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f45d2e;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    background-color: #f7f7f7;
  }
  background-color: white;
  width: 100%;
`;
