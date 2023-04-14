import PageTitle from '@/components/common/PageTitle';
import GetMyinfo from '@/components/Mypage/GetMyinfo';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import NotInput from '@/components/Mypage/Info/NotInput';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import { MESSAGES } from '@/constants/messages';
import { useDispatch } from 'react-redux';
import { checkPassword } from '@/utils/check';
import { patchMyInfo } from '@/apis/mypage/info';
import styled from '@emotion/styled';
import MyPageNavbar from '@/components/layout/MyPageNavbar';
import NotInputPassport from '@/components/Mypage/Info/NotInputPassport';
import NotInputGender from '@/components/Mypage/Info/NotInputGender';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const MyInfo = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [patchInfo, setPatchInfo] = useState({
    passportFirstName: '',
    passportLastName: '',
    userGender: '',
    userBirth: '',
    userEmail: '',
    userName: '',
    userType: '',
    userPhoneNumber: '',
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

  return (
    <Container>
      <MyPageNavbar />
      <MypageWrap>
        <PageTitle title="나의 정보" />
        <div>
          <SmallMonitor>
            <GetMyinfo />
          </SmallMonitor>
          <Form>
            <NotInput id="name" label="이름" type="text" value={patchInfo.userName} />
            <NotInputPassport
              firstName={patchInfo.passportFirstName}
              lastName={patchInfo.passportLastName}
            />
            <NotInput id="birth" label="생년월일" type="text" value={patchInfo.userBirth} />
            <NotInputGender gender={patchInfo.userGender} />
            <NotInput id="email" label="이메일" type="email" value={patchInfo.userEmail} />
          </Form>
          {changeInfo ? (
            <form
              onSubmit={handleSubmit(async (data) => {
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
                placeholder="현재 비밀번호를 입력해 주세요"
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
                placeholder="변경할 비밀번호를 입력해 주세요"
                label="변경할 비밀번호"
              />
              <PasswordCheck>
                {checkPassword(watch('changePassword')) && (
                  <CheckCircleOutlineIcon fontSize="small" />
                )}
                {checkPassword(watch('changePassword'))}
              </PasswordCheck>
              <Input
                error={errors.passwordConfirmation?.message as string}
                register={register('passwordConfirmation', {
                  required: MESSAGES.INPUT.CHECK.CONFIRM_PASSWORD,
                  validate: (value) => value === watch('changePassword') || MESSAGES.LOGIN.CHECK,
                })}
                id="passwordConfirmation"
                type="password"
                label="비밀번호 확인"
                placeholder="변경할 비밀번호를 다시 입력해 주세요"
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
                placeholder="연락처를 입력해 주세요"
                label="전화번호"
              />
              <Button type="submit" disabled={isSubmitting}>
                수정 완료
              </Button>
            </form>
          ) : (
            <div>
              <div>
                <NotInput
                  id="phoneNumber"
                  label="연락처"
                  type="tel"
                  value={patchInfo.userPhoneNumber}
                />
              </div>
              <Button
                onClick={() => {
                  setChangeInfo(true);
                }}
              >
                정보 수정
              </Button>
            </div>
          )}
        </div>
      </MypageWrap>
    </Container>
  );
};

export default MyInfo;

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1200px;
  gap: 30px;
  box-sizing: border-box;
  padding: 16px 0;
  @media (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
    flex-direction: column-reverse;
  }
  @media (max-width: 1200px) {
    padding: 16px;
  }
  justify-content: center;
`;

const MypageWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;
const SmallMonitor = styled.div`
  @media (min-width: 1201px) {
    display: none;
  }
`;
const Form = styled.form`
  margin-top: 40px;
`;
const Button = styled.button`
  background-color: #6dd0f8;
  color: white;
  height: 45px;
  border: 0;
  border-radius: 8px;
  width: 100%;
  font-size: 20px;
`;
const PasswordCheck = styled.div`
  position: absolute;
  top: 1160px;
  display: flex;
  align-items: center;
  color: #0cb1f3;
`;
