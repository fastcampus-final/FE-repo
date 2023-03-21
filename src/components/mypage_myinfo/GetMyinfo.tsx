import { instance } from '@/api/instance';
import { ROUTES } from '@/constants/routes';
import { getCookie } from '@/utils/cookie';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/router';

const GetMyinfo = () => {
  const router = useRouter();

  const [myinfo, setMyinfo] = useState({
    birth: '',
    email: '',
    name: '',
    password: '',
    phone: '',
  });
  useEffect(() => {
    instance({
      method: 'GET',
      url: 'https://www.go-together.store:443/user/myInfo',
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    })
      .then((res) => {
        console.log(res);
        setMyinfo(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        // throw new Error(error);
      });
  }, []);

  const age = () => {
    const today = new Date();
    const birthDate = new Date(myinfo.birth);

    let old = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return (old -= 1);
    }
    return old;
  };

  return (
    <div>
      <Link
        href={{
          pathname: ROUTES.MYPAGE.MYPAGE_INFO,
          query: { data: JSON.stringify(myinfo) },
        }}
      >
        <div>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </div>
        <div>
          <div>
            {myinfo.name}(만 {age()}세)
          </div>
          {router.asPath === '/mypage' && (
            <div>
              <span>나의 정보 보러가기</span>
              <span>
                <ArrowForwardIosIcon />
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default GetMyinfo;
