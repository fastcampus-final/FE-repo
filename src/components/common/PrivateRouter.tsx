import React from 'react';
import { getCookie } from '@/utils/cookie';
import Login from '../../../pages/login';

const withAuth = (Component: React.FC<any>) => {
  const Auth = () => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      return <Login />;
    }
    return <Component />;
  };

  return Auth;
};

export default withAuth;
