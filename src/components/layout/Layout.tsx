import { hideLoading, showLoading } from '@/store/loading';
import { Router } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import Loading from '../common/Loading';
import Modal from '../common/Modal';
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';
import AdminHeader from './admin/AdminHeader';
import AdminNavbar from './admin/AdminNavbar';
import { useCookies } from 'react-cookie';
import ScrollTop from '../common/ScrollTop';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies();

  Router.events.on('routeChangeStart', () => dispatch(showLoading()));
  Router.events.on('routeChangeComplete', () => dispatch(hideLoading()));
  Router.events.on('routeChangeError', () => dispatch(hideLoading()));

  return (
    <Container>
      <title>고투게더</title>
      {cookies.isAdmin ? (
        <>
          <AdminHeader />
          <AdminWrap>
            <AdminNavbar />
            <AdminMain>{children}</AdminMain>
          </AdminWrap>
          <Modal />
          <Loading />
        </>
      ) : (
        <>
          <Header />
          <Main>{children}</Main>
          <Footer />
          <ScrollTop />
          <Modal />
          <Loading />
        </>
      )}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Main = styled.div`
  /* padding: 30px; */
  margin-bottom: 90px;
  padding-top: 130px;
  @media (max-width: 1200px) {
    padding-top: 70px;
  }
`;

const AdminMain = styled.div`
  padding: 30px;
  background-color: #eee;
  width: 82%;
`;

const AdminWrap = styled.div`
  display: flex;
  width: 100%;
`;
