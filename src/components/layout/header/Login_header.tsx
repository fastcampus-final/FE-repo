import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const Login = () => {
  return (
    <div>
      <Link href={ROUTES.LOGIN}>
        <div>
          <LoginIcon />
        </div>
        <div>로그인</div>
      </Link>
    </div>
  );
};

export default Login;
