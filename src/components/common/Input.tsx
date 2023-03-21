import { instance } from '@/api/instance';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  type: string;
  placeholder?: string;
  label?: string;
  id?: string;
  register?: { name: string };
  error?: string;
  email?: string;
  emailCheck?: boolean;
  setEmailCheck?: React.Dispatch<React.SetStateAction<boolean>>;
}

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
}: Props) => {
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
      {id === 'email' && emailCheck === true && <div>사용가능한 이메일입니다.</div>}
      {id === 'email' && emailCheck === false && (
        <div>사용불가능한 이메일입니다. 다른 이메일로 바꿔주세요.</div>
      )}
    </div>
  );
};

export default Input;
