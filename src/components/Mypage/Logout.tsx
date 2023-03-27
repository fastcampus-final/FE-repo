import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { mypageLogout } from './apis';

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={async () => await mypageLogout(dispatch, router)}>Logout</Button>
    </div>
  );
};

export default Logout;
