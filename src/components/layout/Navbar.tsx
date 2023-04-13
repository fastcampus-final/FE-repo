import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import Depth3 from './nav/Depth3';
import AsideNav from './nav/AsideNav';
import { instance } from '@/apis/instance';
import NavCateD1 from './nav/NavCateD1';

const datas = {
  categoryId: 101,
  categoryName: '여행준비',
  children: [
    { categoryId: 101, categoryName: '커뮤니티', children: [] },
    { categoryId: 102, categoryName: '마이페이지', children: [] },
    { categoryId: 103, categoryName: '로그인', children: [] },
  ],
};

const Navbar = () => {
  const [categories, setCategories] = useState([{ categoryName: '', children: [], categoryId: 0 }]);

  useEffect(() => {
    instance({
      method: 'GET',
      url: 'https://www.go-together.store:443/categories',
    })
      .then((res) => {
        // console.log(res.data);
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
