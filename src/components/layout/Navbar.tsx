import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { instance } from '@/apis/instance';
import NavCateD1 from './nav/NavCateD1';
import { alterModal } from '../../utils/check';
import { useDispatch } from 'react-redux';
import { getNavBarData } from '@/apis/layout';

const datas = {
  categoryId: 101,
  categoryName: '여행준비',
  children: [
    { categoryId: 101, categoryName: '커뮤니티', children: [] },
    { categoryId: 102, categoryName: '마이페이지', children: [] },
  ],
};

const Navbar = () => {
  const [categories, setCategories] = useState([{ categoryName: '', children: [], categoryId: 0 }]);
  const dispatch = useDispatch();

  useEffect(() => {
    getNavBarData({ setCategories, dispatch });
  }, []);

  return (
    <Container>
      <NavCateD1 data={datas} />
      {categories.map((data) => (
        <NavCateD1 data={data} key={data.categoryId} />
      ))}
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
`;
