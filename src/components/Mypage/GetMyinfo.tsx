import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ArrowForwardIos } from '@mui/icons-material';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { getMyInfo } from './apis';
import Avatar from 'boring-avatars';

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
      <Avatar
        size={120}
        // name={myinfo.email}
        name={String(Math.random())}
        variant="beam"
        colors={['#0CB1F3', '#63d3ff', '#bdecff', '#fff8c6', '#fff18c']}
      />
      <InfoWrap>
        <p>혼자 여행도 마다하지 않는 인싸</p>
        <UserName>
          {/* {myinfo.name} */}
          <span>김선자</span>
          {/* (여, {globalAge(myinfo)}세 )*/}
          <span>(여, 50세)</span>
        </UserName>
        {router.asPath === '/mypage' && (
          <MyInfoWrap>
            <Link
              href={{
                pathname: ROUTES.MYPAGE.INFO,
                query: { data: JSON.stringify(myinfo) },
              }}
            >
              <GoMyInfo>
                나의 정보 보러가기 <ArrowForwardIos fontSize="small" />
              </GoMyInfo>
            </Link>
          </MyInfoWrap>
        )}
      </InfoWrap>
    </Container>
  );
};

export default GetMyinfo;

const Container = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  border-radius: 10px;
  background-color: #e7f7fe;
  box-sizing: border-box;
  padding: 30px;
  max-width: 100%;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const InfoWrap = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: space-between;
`;

const UserName = styled.div`
  display: flex;
  gap: 8px;
`;

const MyInfoWrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const GoMyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
