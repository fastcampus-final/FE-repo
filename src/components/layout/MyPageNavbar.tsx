import React, { useState } from 'react';
import Logout from '@/components/Mypage/Logout';
import Withdrawal from '@/components/Mypage/Withdrawal';
import { ROUTES } from '@/constants/routes';
import styled from '@emotion/styled';
import List from '@mui/material/List';
import { useRouter } from 'next/router';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface ICssProps {
  none: string;
}

const MyPageNavbar = () => {
  const router = useRouter();
  const [modal, setmodal] = useState(false);

  return (
    <MypageNavbar none={router.asPath.slice(0, 8) === '/mypage/' ? 'none' : 'block'}>
      <List>
        <ListItemButton onClick={() => router.push(ROUTES.MYPAGE.INFO)}>
          <Text>나의 정보</Text>
          <div>
            <KeyboardArrowRightIcon />
          </div>
        </ListItemButton>
        <ListItemButton onClick={() => router.push(ROUTES.MYPAGE.WISH)}>
          <Text>나의 관심 상품</Text>
          <div>
            <KeyboardArrowRightIcon />
          </div>
        </ListItemButton>
        <ListItemButton onClick={() => router.push(ROUTES.MYPAGE.ORDER)}>
          <Text>나의 예약 내역</Text>
          <div>
            <KeyboardArrowRightIcon />
          </div>
        </ListItemButton>
        <ListItemButton onClick={() => router.push(ROUTES.MYPAGE.REVIEW)}>
          <Text>나의 여행 후기</Text>
          <div>
            <KeyboardArrowRightIcon />
          </div>
        </ListItemButton>
      </List>
      <WithdrawalWrap>
        <Withdrawal modal={modal} setmodal={setmodal} />
      </WithdrawalWrap>
    </MypageNavbar>
  );
};

export default MyPageNavbar;

const MypageNavbar = styled.nav`
  width: 30%;
  @media (max-width: 1200px) {
    width: 100%;
    display: ${(props: ICssProps) => props.none};
  }
`;

const LogoutWrap = styled.div`
  width: 100%;
  margin-right: 15px;
  @media (max-width: 1200px) {
    margin-top: 115px;
  }
`;
const ListItemButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 0;
  background-color: inherit;
  width: 100%;
  font-size: 14px;
  cursor: pointer;
`;
const WithdrawalWrap = styled.div`
  font-size: 14px;
  margin-top: 30px;
  @media (max-width: 1200px) {
    margin-top: 180px;
    justify-content: flex-end;
  }
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  font-size: 16px;
`;
