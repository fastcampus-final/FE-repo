import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { layoutRoutes } from '@/constants/layoutRoutes';
import { ROUTES } from '@/constants/routes';

interface IProps {
  categoryId: number;
  categoryName: string;
  children: IProps[];
}

const NavCateD1 = ({ data }: { data: IProps }) => {
  const [open, setOpen] = useState(false);
  const [reOpen, setReOpen] = useState(0);
  const router = useRouter();

  return (
    <Inner>
      <Div
        onClick={() => {
          setOpen(!open);
          setReOpen(0);
        }}
      >
        <KeyboardArrowDownIcon />
        {data.categoryName}
      </Div>
      {open &&
        data.children.map((data) => (
          <div key={data.categoryId}>
            <TwoDepth
              onClick={() => {
                if (data.children.length === 0) {
                  if (data.categoryId > 100) {
                    router.push({
                      pathname: layoutRoutes[data.categoryId],
                    });
                  } else {
                    router.push({
                      pathname: ROUTES.PRODUCT,
                      query: { categoryId: data.categoryId },
                    });
                  }
                  setOpen(false);
                } else {
                  setOpen(true);
                  if (reOpen === data.categoryId) {
                    setReOpen(0);
                  } else {
                    setReOpen(data.categoryId);
                  }
                }
              }}
            >
              {data.children.length !== 0 && <KeyboardArrowDownIcon />}
              {data.categoryName}
            </TwoDepth>
            {reOpen === data.categoryId &&
              data.children.map((data) => (
                <ThreeDepth
                  key={data.categoryId}
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
                    setReOpen(0);
                    setOpen(false);
                  }}
                >
                  {data.categoryName}
                </ThreeDepth>
              ))}
          </div>
        ))}
    </Inner>
  );
};

export default NavCateD1;

const Inner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 200px;
  cursor: pointer;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 60px;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  width: 200px;
  &:hover {
    background-color: #f7f7f7;
  }
`;
const TwoDepth = styled.div`
  height: 60px;
  display: flex;
  padding-left: 30px;
  align-items: center;
  color: #0cb1f3;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    background-color: #e7f7fe;
  }
  background-color: white;
  box-sizing: border-box;
  width: 200px;
`;

const ThreeDepth = styled.div`
  height: 40px;
  display: flex;
  padding-left: 30px;
  align-items: center;
  font-size: 16px;
  &:hover {
    background-color: #e7f7fe;
  }
  background-color: white;
  box-sizing: border-box;
  width: 200px;
`;
