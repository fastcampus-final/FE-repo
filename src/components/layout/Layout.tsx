import { hideLoading, showLoading } from '@/store/loading';
import { Router } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Loading from '../common/Loading';
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  Router.events.on('routeChangeStart', () => dispatch(showLoading()));
  Router.events.on('routeChangeComplete', () => dispatch(hideLoading()));
  Router.events.on('routeChangeError', () => dispatch(hideLoading()));

  return (
    <Container>
      <Header />
      <Navbar />
      <Main>{children}</Main>
      <Footer />
      <Loading />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  border: 1px solid black;
`;

const Main = styled.div`
  padding: 30px;
`;
