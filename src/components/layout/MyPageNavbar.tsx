import React, { useState } from 'react';
import Logout from '@/components/Mypage/Logout';
import Withdrawal from '@/components/Mypage/Withdrawal';
import { ROUTES } from '@/constants/routes';
import styled from '@emotion/styled';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';

const MyPageNavbar = () => {
  const router = useRouter();
  const [modal, setmodal] = useState(false);

  return (
    <MypageNavbar>
      <List>
        <ListItemButton onClick={() => router.push(ROUTES.MYPAGE.INFO)}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="나의 정보" />
        </ListItemButton>
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
      <LogoutWrap>
        <Logout />
      </LogoutWrap>
      <Withdrawal modal={modal} setmodal={setmodal} />
    </MypageNavbar>
  );
};

export default MyPageNavbar;

const MypageNavbar = styled.nav`
  width: 30%;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const LogoutWrap = styled.div`
  display: none;
  @media (max-width: 1200px) {
    display: flex;
    width: 100%;
  }
`;
