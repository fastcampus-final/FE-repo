import { instance } from '@/api/instance';
import { MESSAGES } from '@/constants/messages';
import { setModal } from '@/store/modal';
import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookies] = useCookies();

  return (
    <div>
      <button
        onClick={async () => {
          await instance({
            method: 'POST',
            url: 'https://www.go-together.store:443/user/logout',
            data: {
              refreshToken: cookies.refreshToken,
            },
          })
            .then((res) => {
              if (res.data.code === 200) {
                removeCookies('accessToken');
                removeCookies('refreshToken');
                removeCookies('isAdmin');
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
