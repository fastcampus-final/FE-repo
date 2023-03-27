import { MESSAGES } from '@/constants/messages';
import { IPasswordModal } from '@/interfaces/passwordModal';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { deleteMyAccount, searchMyPassword } from '../Mypage/apis';
import Input from './Input';

const PasswordModal = ({ setmodal }: IPasswordModal) => {
  const router = useRouter();
  const dispatch = useDispatch();

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
      {router.asPath === '/login' ? (
        <form
          onSubmit={handleSubmit(async (data) => {
            searchMyPassword(data, dispatch);
          })}
        >
          <Input
            error={errors.email?.message as string}
            register={register('email', {
              required: MESSAGES.INPUT.CHECK.EMAIL,
            })}
            id="email"
            type="email"
            placeholder="aaa@naver.com"
            label="이메일"
          />
          <button type="submit" disabled={isSubmitting}>
            비밀번호 발송
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit(async (data) => {
            if (confirm(MESSAGES.WITHDRAWAL.CONFIRM)) {
              await deleteMyAccount(data, dispatch, router);
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
      )}
    </div>
  );
};

export default PasswordModal;
