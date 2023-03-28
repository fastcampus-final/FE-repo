import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { getMyInfo } from './apis';
import { globalAge } from './function';

const GetMyinfo = () => {
  const router = useRouter();

  const [myinfo, setMyinfo] = useState({
    birth: '',
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  useEffect(() => {
    getMyInfo(setMyinfo);
  }, []);

  return (
    <Container>
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
      <Link
        href={{
          pathname: ROUTES.MYPAGE.INFO,
          query: { data: JSON.stringify(myinfo) },
        }}
      >
        <div></div>
        <div>
          <div>
            {myinfo.name}(만 {globalAge(myinfo)}세)
          </div>
          {router.asPath === '/mypage' && (
            <div>
              <span>나의 정보 보러가기</span>
              <span>
                <ArrowForwardIosIcon />
              </span>
            </div>
          )}
        </div>
      </Link>
    </Container>
  );
};

export default GetMyinfo;

const Container = styled.div`
  display: flex;
  background-color: #d9d9d9;
  height: 120px;
  box-sizing: border-box;
`;
