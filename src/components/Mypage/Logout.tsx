import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { mypageLogout } from './apis';

const Logout = () => {
  const [cookies, , removeCookies] = useCookies();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Button
      variant="outlined"
      onClick={async () => await mypageLogout(dispatch, router, cookies, removeCookies)}
    >
      로그아웃
    </Button>
  );
};

export default Logout;
