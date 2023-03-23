import { instance } from '@/api/instance';
import { MESSAGES } from '@/constants/messages';
import { IPasswordModal } from '@/interfaces/passwordModal';
import { setModal } from '@/store/modal';
import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Input from './Input';

const PasswordModal = ({ setmodal }: IPasswordModal) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookies] = useCookies();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <div>
      <button
        onClick={() => {
          setmodal !== undefined && setmodal(false);
        }}
      >
        x
      </button>
      <form
        onSubmit={handleSubmit(async (data) => {
          if (confirm(MESSAGES.WITHDRAWAL.CONFIRM)) {
            await instance({
              method: 'DELETE',
              url: 'https://www.go-together.store:443/user/withdraw',
              data: data,
            })
              .then(async (res) => {
                if (res.data.code === 200) {
                  await removeCookies('accessToken');
                  await removeCookies('refreshToken');
                  await removeCookies('isAdmin');
                  await dispatch(
                    setModal({
                      isOpen: true,
                      onClickOk: () => dispatch(setModal({ isOpen: false })),
                      text: MESSAGES.WITHDRAWAL.COMPLETE,
                    }),
                  );
                  await router.push('/');
                } else {
                  dispatch(
                    setModal({
                      isOpen: true,
                      onClickOk: () => dispatch(setModal({ isOpen: false })),
                      text: res.data.data,
                    }),
                  );
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })}
      >
        <Input
          error={errors.password?.message as string}
          register={register('password', {
            required: MESSAGES.INPUT.CHECK.PASSWORD,
          })}
          id="password"
          type="password"
          placeholder="********"
          label="비밀번호"
        />
        <button type="submit" disabled={isSubmitting}>
          회원탈퇴
        </button>
      </form>
    </div>
  );
};

export default PasswordModal;
