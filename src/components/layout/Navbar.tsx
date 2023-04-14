import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import NavCateD1 from './nav/NavCateD1';
import { useDispatch } from 'react-redux';
import { getNavBarData } from '@/apis/layout';

const datas = {
  categoryId: 101,
  categoryName: '여행준비',
  children: [
    { categoryId: 101, categoryName: '커뮤니티', children: [] },
    { categoryId: 105, categoryName: '여행 유형 테스트', children: [] },
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
      {categories.map((data) => (
        <NavCateD1 data={data} key={data.categoryId} />
      ))}
      <NavCateD1 data={datas} />
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
`;
