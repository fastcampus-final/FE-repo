import styled from '@emotion/styled';
import React, { useState } from 'react';
import Depth2 from './Depth2';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface IDataProps {
  categoryName: string;
  children: IDataProps[];
  categoryId: number;
}

const Depth1 = ({ data }: { data: IDataProps }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <OneDepth
        onClick={() => {
          setOpen(!open);
        }}
      >
        <KeyboardArrowDownIcon />
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
  height: 50px;
  display: flex;
  padding-left: 30px;
  align-items: center;
  color: #0cb1f3;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    background-color: #f7f7f7;
  }
`;
