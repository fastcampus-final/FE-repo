import React from 'react';
import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Mypage = () => {
  return (
    <>
      <Link href={ROUTES.MYPAGE.MAIN}>
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </Link>
      <Link href={ROUTES.ORDER}>
        <Badge color="error" badgeContent={0} showZero>
          <NotificationsIcon color="action" />
        </Badge>
      </Link>
    </>
  );
};

export default Mypage;
