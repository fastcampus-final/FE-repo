import React from 'react';
import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Mypage = () => {
  return (
    <div>
      <div>
        <Link href={ROUTES.MYPAGE.MYPAGE_MAIN}>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </Link>
      </div>
      <div>
        <Link href={ROUTES.ORDER}>
          <Badge color="error" badgeContent={0} showZero>
            <NotificationsIcon color="action" />
          </Badge>
        </Link>
      </div>
    </div>
  );
};

export default Mypage;
