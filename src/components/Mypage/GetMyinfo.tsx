import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ArrowForwardIos } from '@mui/icons-material';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { getMyInfo } from '../../apis/mypage/info';
import Avatar from 'boring-avatars';
import { globalAge } from '../../utils/globalAge';
import { useDispatch } from 'react-redux';

const GetMyinfo = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [myinfo, setMyinfo] = useState({
    passportFirstName: '',
    passportLastName: '',
    userGender: '',
    userBirth: '',
    userEmail: '',
    userName: '',
    userType: '',
    userPhoneNumber: '',
  });
  const [windowW, setWindowW] = useState(window.screen.width);
  window.onresize = () => {
    setWindowW(window.screen.width);
  };

  useEffect(() => {
    getMyInfo(setMyinfo, dispatch);
  }, []);

  return (
    <Container>
      <Avatar
        size={windowW > 1200 ? 155 : 80}
        // name={myinfo.email}
        name={String(Math.random())}
        variant="beam"
        colors={['#0CB1F3', '#63d3ff', '#bdecff', '#fff8c6', '#fff18c']}
      />
      <InfoWrap>
        <p>{myinfo.userType || ''}</p>
        <UserName>
          <Name>{myinfo.userName}</Name>
          <span>
            ({myinfo.userGender === 'male' ? '남' : '여'}, 만 {globalAge(myinfo)}세 )
          </span>
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
  height: 266px;
  @media (max-width: 1200px) {
    width: 100%;
    height: 136px;
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
  font-size: 15px;
  font-weight: bold;
`;
const Name = styled.span`
  font-size: 15px;
  font-weight: semibold;
`;
