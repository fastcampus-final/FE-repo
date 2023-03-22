import { instance } from '@/api/instance';
import { MESSAGES } from '@/constants/messages';
import { setModal } from '@/store/modal';
import { getCookie, removeCookie } from '@/utils/cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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
                removeCookie('accessToken');
                removeCookie('refreshToken');
                removeCookie('isAdmin');
                dispatch(
                  setModal({
                    isOpen: true,
                    onClickOk: () => dispatch(setModal({ isOpen: false })),
                    text: MESSAGES.LOGOUT.COMPLETE_LOGOUT,
                  }),
                );
                router.push('/');
              } else {
                dispatch(
                  setModal({
                    isOpen: true,
                    onClickOk: () => dispatch(setModal({ isOpen: false })),
                    text: MESSAGES.LOGOUT.ERROR_LOGOUT,
                  }),
                );
              }
            })
            .catch((error) => {
              console.log(error);
              dispatch(
                setModal({
                  isOpen: true,
                  onClickOk: () => dispatch(setModal({ isOpen: false })),
                  text: MESSAGES.LOGOUT.ERROR_LOGOUT,
                }),
              );
            });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
