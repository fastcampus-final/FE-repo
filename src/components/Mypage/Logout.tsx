import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { mypageLogout } from '../../apis/mypage/info';
import styled from '@emotion/styled';

interface ICssprops {
  width: string;
}

const Logout = () => {
  const [cookies, , removeCookies] = useCookies();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Button
      onClick={async () => await mypageLogout(dispatch, router, cookies, removeCookies)}
      width={router.asPath === '/mypage' ? '285px' : '100%'}
    >
      로그아웃
    </Button>
  );
};

export default Logout;

const Button = styled.nav`
  width: 100%;
  border: 1px solid #878787;
  padding: 15px 0 15px 0;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #878787;
  font-size: 16px;
  @media (min-width: 1201px) {
    width: ${(props: ICssprops) => props.width};
    margin-left: 10px;
  }
`;
