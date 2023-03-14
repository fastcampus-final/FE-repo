import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { getCookie } from '@/utils/cookie';
import Login from '../../../pages/login';

const withAuth = (Component: NextPage | React.FC) => {
  const Auth = () => {
    const router = useRouter();
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      router.replace('/');
      return <Login />;
    }
    return <Component />;
  };

  return Auth;
};

export default withAuth;
