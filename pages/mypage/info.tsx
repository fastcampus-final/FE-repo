import PageTitle from '@/components/common/PageTitle';
import GetMyinfo from '@/components/mypage_myinfo/GetMyinfo';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import NotInput from '@/components/common/NotInput';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import { instance } from '@/api/instance';
import Button from '@mui/material/Button';

const info = () => {
  const [patchInfo, setPatchInfo] = useState({
    birth: '',
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  const [changeInfo, setChangeInfo] = useState(false);

  const router = useRouter();
  const info = router.query.data;

  useEffect(() => {
    if (info !== undefined) {
      setPatchInfo(JSON.parse(info as string));
      console.log(JSON.parse(info as string));
    }
  }, [info]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  const passwordRef = useRef('');
  passwordRef.current = watch('newPassword');

  const checkPassword = () => {
    let res = '';
    let cnt = 0;
    const passwordCondition = ['[A-Z]', '[a-z]', '[0-9]', '[!@#$%^&*()]'];

    for (let i = 0; i < passwordCondition.length; i += 1) {
      if (new RegExp(passwordCondition[i]).test(watch('newPassword'))) {
        cnt += 1;
      }
    }

    switch (cnt) {
      case 2:
        res = '낮음';
        break;
      case 3:
        res = '적정';
        break;
      case 4:
        res = '높음';
        break;
      default:
        return '';
    }
    return `비밀번호 안전도 : ${res}`;
  };

  return (
    <div>
      <PageTitle title="내 프로필" />
      <div>
        <div>
          <GetMyinfo />
        </div>
        <div>
          <NotInput id="email" label="이메일" type="email" value={patchInfo.email} />
          <NotInput id="birth" label="생년월일" type="date" value={patchInfo.birth} />
        </div>
        {changeInfo ? (
          <form
            onSubmit={handleSubmit(async (data) => {
              await instance({
                method: 'PATCH',
                url: 'https://www.go-together.store:443/user/myInfo',
                data: data,
              })
                .then(async (res) => {
                  console.log(res);
                  if (res.data.code === 200) {
                    await setPatchInfo({ ...patchInfo, phone: res.data.data.phone });
                    await setChangeInfo(false);
                  } else {
                    alert(res.data.data);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  // throw new Error(error);
                });
            })}
          >
            <Input
              error={errors.oldPassword?.message as string}
              register={register('oldPassword', {
                required: '비밀번호는 필수 입력입니다.',
                minLength: {
                  value: 8,
                  message: '8자리 이상 비밀번호를 사용하세요.',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z!@#$%^&*()])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: '적합한 비밀번호가 아닙니다.',
                },
              })}
              id="oldPassword"
              type="password"
              placeholder="********"
              label="현재 비밀번호"
            />
            <Input
              error={errors.newPassword?.message as string}
              register={register('newPassword', {
                required: '비밀번호는 필수 입력입니다.',
                minLength: {
                  value: 8,
                  message: '8자리 이상 비밀번호를 사용하세요.',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z!@#$%^&*()])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: '적합한 비밀번호가 아닙니다.',
                },
              })}
              id="newPassword"
              type="password"
              placeholder="********"
              label="변경할 비밀번호"
            />
            {checkPassword()}
            <Input
              error={errors.phone?.message as string}
              register={register('phone', {
                required: '전화번호는 필수 입력입니다.',
                pattern: {
                  value: /[0-9]{3}[0-9]{3,4}[0-9]{4}/,
                  message: '전화번호 형식에 맞지 않습니다.',
                },
                maxLength: {
                  value: 11,
                  message: '전화번호는 11자리 이하입니다.',
                },
              })}
              id="phone"
              type="tel"
              placeholder="01011112222"
              label="전화번호"
            />
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              수정 완료
            </Button>
          </form>
        ) : (
          <div>
            <div>
              <NotInput id="password" label="비밀번호" type="password" value={patchInfo.password} />
              <NotInput id="phone" label="전화번호" type="tel" value={patchInfo.phone} />
            </div>
            <Button
              variant="contained"
              onClick={() => {
                setChangeInfo(true);
              }}
            >
              정보 수정
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default info;
