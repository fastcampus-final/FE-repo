import { MESSAGES } from '@/constants/messages';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { signupEmailCheck } from './apis';

export interface IInputProps {
  error: string;
  register: { name: string };
  email?: string;
  emailCheck?: boolean;
  setEmailCheck?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailInput = ({ register, error, email, setEmailCheck, emailCheck }: IInputProps) => {
  const router = useRouter();
  return (
    <div>
      <label htmlFor="userEmail">이메일</label>
      <input id="userEmail" type="email" placeholder="aaa@naver.com" {...register} />
      {error && <div role="alert">{error}</div>}
      {router.asPath === '/signup' && email !== undefined && setEmailCheck !== undefined && (
        <Button
          onClick={async () => {
            await signupEmailCheck(email, setEmailCheck);
            console.log(email, emailCheck);
          }}
        >
          중복확인
        </Button>
      )}
      {router.asPath === '/signup' &&
        (emailCheck ? (
          <div>{MESSAGES.SIGNUP.UNUSED_EMAIL}</div>
        ) : (
          <div>{MESSAGES.SIGNUP.USED_EMAIL}</div>
        ))}
    </div>
  );
};

export default EmailInput;
