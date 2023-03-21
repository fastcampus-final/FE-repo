import { instance } from '@/api/instance';
import { getCookie, removeCookie } from '@/utils/cookie';
import { useRouter } from 'next/router';
import React from 'react';

const Logout = () => {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={async () => {
          await instance({
            method: 'POST',
            url: 'https://www.go-together.store:443/user/logout',
            data: {
              refreshToken: `${getCookie('refreshToken')}`,
            },
          })
            .then((res) => {
              if (res.data.code === 200) {
                alert('로그아웃이 완료되었습니다.');
                removeCookie('accessToken');
                removeCookie('refreshToken');
                router.push('/');
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
