import React from 'react';
import { getCookie } from '@/utils/cookie';
import Login from '../../../pages/login';
import { useCookies } from 'react-cookie';

const withAuth = (Component: React.FC<any>) => {
  const Auth = () => {
    const [cookies, setCookies, removeCookies] = useCookies();

    if (!cookies.accessToken) {
      return <Login />;
    }
    return <Component />;
  };

  return Auth;
};

export default withAuth;
