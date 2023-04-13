import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import Depth3 from './nav/Depth3';
import AsideNav from './nav/AsideNav';
import { instance } from '@/apis/instance';
import NavCateD1 from './nav/NavCateD1';
import { alterModal } from '../SignIn/function';
import { useDispatch } from 'react-redux';

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
    instance({
      method: 'GET',
      url: 'https://www.go-together.store:443/categories',
    })
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => {
        alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
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
