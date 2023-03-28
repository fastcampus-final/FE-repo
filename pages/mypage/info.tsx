import PageTitle from '@/components/common/PageTitle';
import GetMyinfo from '@/components/Mypage/GetMyinfo';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import NotInput from '@/components/common/NotInput';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import Button from '@mui/material/Button';
import { MESSAGES } from '@/constants/messages';
import { useDispatch } from 'react-redux';
import { checkPassword } from '@/components/SignIn/function';
import { patchMyInfo } from '@/components/Mypage/apis';

const info = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [patchInfo, setPatchInfo] = useState({
    birth: '',
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  const [changeInfo, setChangeInfo] = useState(false);

  const info = router.query.data;

  useEffect(() => {
    if (info !== undefined) {
      setPatchInfo(JSON.parse(info as string));
    }
  }, [info]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  console.log(patchInfo);

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
              console.log(data);
              await patchMyInfo(data, setPatchInfo, patchInfo, setChangeInfo, dispatch);
            })}
          >
            <Input
              error={errors.userPassword?.message as string}
              register={register('userPassword', {
                required: MESSAGES.INPUT.CHECK.PASSWORD,
                minLength: {
                  value: 8,
                  message: MESSAGES.INPUT.ERROR.PASSWORD_MIN,
                },
                pattern: {
                  value: /^(?=.*[A-Za-z!@#$%^&*()])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: MESSAGES.INPUT.ERROR.PASSWORD_PATTERN,
                },
              })}
              id="userPassword"
              type="password"
              placeholder="********"
              label="현재 비밀번호"
            />
            <Input
              error={errors.changePassword?.message as string}
              register={register('changePassword', {
                required: MESSAGES.INPUT.CHECK.PASSWORD,
                minLength: {
                  value: 8,
                  message: MESSAGES.INPUT.ERROR.PASSWORD_MIN,
                },
                pattern: {
                  value: /^(?=.*[A-Za-z!@#$%^&*()])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: MESSAGES.INPUT.ERROR.PASSWORD_PATTERN,
                },
              })}
              id="changePassword"
              type="password"
              placeholder="********"
              label="변경할 비밀번호"
            />
            {checkPassword(watch('changePassword'))}
            <Input
              error={errors.passwordConfirmation?.message as string}
              register={register('passwordConfirmation', {
                required: MESSAGES.INPUT.CHECK.CONFIRM_PASSWORD,
                validate: (value) =>
                  value === watch('changePassword') || MESSAGES.LOGIN.CHECK_PASSWORD,
              })}
              id="passwordConfirmation"
              type="password"
              label="비밀번호 확인"
            />
            <Input
              error={errors.userPhoneNumber?.message as string}
              register={register('userPhoneNumber', {
                required: MESSAGES.INPUT.CHECK.PHONE,
                pattern: {
                  value: /[0-9]{3}[0-9]{3,4}[0-9]{4}/,
                  message: MESSAGES.INPUT.ERROR.PHONE_PATTERN,
                },
                maxLength: {
                  value: 11,
                  message: MESSAGES.INPUT.ERROR.PHONE_MAX,
                },
              })}
              id="userPhoneNumber"
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
