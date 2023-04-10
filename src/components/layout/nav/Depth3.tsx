import { layoutRoutes } from '@/constants/layoutRoutes';
import { ROUTES } from '@/constants/routes';
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
        if (data.categoryId === 101 || data.categoryId === 102) {
          router.push({
            pathname: layoutRoutes[data.categoryId],
          });
        } else {
          router.push({
            pathname: ROUTES.PRODUCT,
            query: { categoryId: data.categoryId },
          });
        }
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
  padding-left: 30px;
  align-items: center;
  font-size: 16px;
  &:hover {
    background-color: #f7f7f7;
  }
  background-color: white;
  width: 100%;
`;
