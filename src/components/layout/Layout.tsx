import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  background-color: #c5ebff;
`;
