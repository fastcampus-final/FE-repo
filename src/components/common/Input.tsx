import { instance } from '@/api/instance';
import { MESSAGES } from '@/constants/messages';
import { IInputProps } from '@/interfaces/inputProps';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import React from 'react';

const Input = ({
  error,
  register,
  id,
  type,
  placeholder,
  label,
  email,
  emailCheck,
  setEmailCheck,
}: IInputProps) => {
  const router = useRouter();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} {...register} />
      {error && <div role="alert">{error}</div>}
      {id === 'email' && router.asPath === '/signup' && (
        <Button
          onClick={async () => {
            await instance({
              method: 'GET',
              url: `https://www.go-together.store:443/user/emailCheck?email=${email}`,
            })
              .then((res) => {
                console.log(res.data);
                if (res.data.data === true && setEmailCheck !== undefined) {
                  setEmailCheck(true);
                } else if (res.data.data !== true && setEmailCheck !== undefined) {
                  setEmailCheck(false);
                }
              })
              .catch((error) => {
                console.log('error');
                console.log(error);
              });
          }}
        >
          중복확인
        </Button>
      )}
      {id === 'email' && emailCheck === true && <div>{MESSAGES.SIGNUP.UNUSED_EMAIL}</div>}
      {id === 'email' && emailCheck === false && <div>{MESSAGES.SIGNUP.USED_EMAIL}</div>}
    </div>
  );
};

export default Input;
