import { instance } from '@/api/instance';
import { getCookie, removeCookie } from '@/utils/cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';

interface Props {
  setmodal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordModal = ({ setmodal }: Props) => {
  const router = useRouter();
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
          if (confirm('회원탈퇴를 진행하시겠습니까? ')) {
            console.log(true);
            await instance({
              method: 'DELETE',
              url: 'https://www.go-together.store:443/user/withdraw',
              data: data,
            })
              .then(async (res) => {
                console.log(res.data);
                if (res.data.code === 200) {
                  removeCookie('accessToken');
                  removeCookie('refreshToken');
                  alert('회원탈퇴가 완료되었습니다.');
                  router.push('/');
                } else {
                  alert(res.data.data);
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
            required: '비밀번호는 필수 입력입니다.',
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
