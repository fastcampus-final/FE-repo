import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Depth3 from './Depth3';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { layoutRoutes } from '@/constants/layoutRoutes';

interface IDataProps {
  categoryName: string;
  children: IDataProps[];
  categoryId: number;
}

const Depth2 = ({ data }: { data: IDataProps }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  console.log(data);

  return (
    <>
      <TwoDepth
        onClick={() => {
          setOpen(!open);
          if (data.children.length === 0) {
            router.push(layoutRoutes[data.categoryId]);
          }
        }}
      >
        {data.children.length !== 0 && <KeyboardArrowDownIcon />}
        {data.categoryName}
      </TwoDepth>
      {open &&
        data.children.length !== 0 &&
        data.children.map((dataDepth3) => <Depth3 key={dataDepth3.categoryId} data={dataDepth3} />)}
    </>
  );
};

export default Depth2;

const TwoDepth = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 18px;
  font-weight: semi-bold;
  &:hover {
    background-color: #f7f7f7;
  }
`;
