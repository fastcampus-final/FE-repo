import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import GetMyinfo from '@/components/Mypage/GetMyinfo';
import Logout from '@/components/Mypage/Logout';
import Withdrawal from '@/components/Mypage/Withdrawal';
import { ROUTES } from '@/constants/routes';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import styled from '@emotion/styled';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';

const index = () => {
  const router = useRouter();
  const [modal, setmodal] = useState(false);

  return (
    <Container>
      <PageTitle title="마이 페이지" />
      <GetMyinfo />
      <nav>
        <List>
          <ListItemButton onClick={() => router.push(ROUTES.MYPAGE.WISH)}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="나의 관심 상품" />
          </ListItemButton>
          <ListItemButton onClick={() => router.push(ROUTES.MYPAGE.ORDER)}>
            <ListItemIcon>
              <CreditScoreIcon />
            </ListItemIcon>
            <ListItemText primary="나의 예약 내역" />
          </ListItemButton>
          <ListItemButton onClick={() => router.push(ROUTES.MYPAGE.REVIEW)}>
            <ListItemIcon>
              <SmsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="나의 여행 후기" />
          </ListItemButton>
        </List>
      </nav>
      <Logout />
      <Withdrawal modal={modal} setmodal={setmodal} />
    </Container>
  );
};

export default withAuth(index);

export async function getServerSideProps() {
  const layout = 'mypage';
  return {
    props: {
      layout,
    },
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;
