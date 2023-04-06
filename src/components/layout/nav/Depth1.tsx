import styled from '@emotion/styled';
import React, { useState } from 'react';
import Depth2 from './Depth2';
import { useRouter } from 'next/router';

interface IDataProps {
  categoryName: string;
  children: IDataProps[];
  categoryId: number;
}

const Depth1 = ({ data }: { data: IDataProps }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <OneDepth
        onClick={() => {
          setOpen(!open);
          if (data.children.length === 0) {
            router.push('/login');
          }
        }}
      >
        {data.categoryName}
      </OneDepth>
      {open &&
        data.children.length !== 0 &&
        data.children.map((dataDepth2) => <Depth2 key={dataDepth2.categoryId} data={dataDepth2} />)}
    </>
  );
};

export default Depth1;

const OneDepth = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0cb1f3;
  font-size: 20px;
  font-weight: bold;
  &:hover {
    background-color: #f7f7f7;
  }
`;
