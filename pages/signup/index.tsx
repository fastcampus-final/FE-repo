import Input from '@/components/common/Input';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MESSAGES } from '@/constants/messages';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { alterModal, checkPassword } from '@/utils/check';
import { signUpLogin, signUp } from '@/apis/signup';
import GenderInput from '@/components/SignIn/GenderInput';
import EmailInput from '@/components/SignIn/EmailInput';
import { useDispatch } from 'react-redux';
import PassportInput from '@/components/SignIn/PassportInput';
import PageTitle from '@/components/common/PageTitle';
import styled from '@emotion/styled';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Signup = () => {
  const [emailCheck, setEmailCheck] = useState(false);
  const [cookies, setCookies] = useCookies();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      alterModal(MESSAGES.VALID_AUTH, dispatch);
      router.back();
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <Container>
      <TitleContainer>
        <PageTitle title="회원가입" />
      </TitleContainer>
      <Text>회원으로 고투게더의 다양한 여행을 만나보세요</Text>
      <Form
        onSubmit={handleSubmit(async (data) => {
          if (confirm(MESSAGES.SIGNUP.SUBMIT_CHECK) && emailCheck) {
            await signUp(data, dispatch);
            await signUpLogin(data, dispatch, router, setCookies);
          } else {
            await alterModal(MESSAGES.SIGNUP.INPUT_ERROR, dispatch);
          }
        })}
      >
        <InputsContainer>
          <Number>1. 로그인 정보</Number>
          <EmailInput
            error={errors.userEmail?.message as string}
            register={register('userEmail', {
              required: MESSAGES.INPUT.CHECK.EMAIL,
              pattern: {
                value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: MESSAGES.INPUT.ERROR.EMAIL_PATTERN,
              },
            })}
            email={watch('userEmail')}
            emailCheck={emailCheck}
            setEmailCheck={setEmailCheck}
          />
          <Password>
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
                maxLength: {
                  value: 16,
                  message: MESSAGES.INPUT.ERROR.PASSWORD_MAX,
                },
              })}
              id="userPassword"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              label="비밀번호"
            />
            <PasswordCheck>
              {checkPassword(watch('userPassword')) && <CheckCircleOutlineIcon fontSize="small" />}
              {checkPassword(watch('userPassword'))}
            </PasswordCheck>
            <Input
              error={errors.passwordConfirmation?.message as string}
              register={register('passwordConfirmation', {
                required: MESSAGES.INPUT.CHECK.CONFIRM_PASSWORD,
                validate: (value) =>
                  value === watch('userPassword') || MESSAGES.SIGNUP.CONFIRM_PASSWORD,
              })}
              id="passwordConfirmation"
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해 주세요"
            />
          </Password>
        </InputsContainer>
        <InputsContainer>
          <Number>2. 회원 정보</Number>
          <Input
            error={errors.userName?.message as string}
            register={register('userName', {
              required: MESSAGES.INPUT.CHECK.NAME,
              pattern: {
                value: /[가-힣]{3,4}/,
                message: MESSAGES.INPUT.ERROR.NAME_PATTERN,
              },
              maxLength: {
                value: 4,
                message: MESSAGES.INPUT.ERROR.NAME_MAX,
              },
            })}
            id="userName"
            type="text"
            placeholder="이름을 입력해 주세요"
            label="이름"
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
            placeholder="연락처를 입력해주세요 ('-'은 제외해주세요)"
            label="휴대폰 번호"
          />
          <Input
            error={errors.userBirth?.message as string}
            register={register('userBirth', {
              required: MESSAGES.INPUT.CHECK.BIRTH,
              pattern: {
                value: /[0-9]{8}/,
                message: MESSAGES.INPUT.ERROR.BIRTH_PATTERN,
              },
            })}
            id="userBirth"
            type="text"
            label="생년월일"
            placeholder="생년월일을 입력해주세요 (예 : 20000101)"
          />
          <GenderInput
            error={errors.userGender?.message as string}
            register={register('userGender', {
              required: MESSAGES.INPUT.CHECK.SEX,
            })}
          />
        </InputsContainer>
        <InputsContainer>
          <Number>3. 여권 정보</Number>
          <PassportInput
            error1={errors.passportFirstName?.message as string}
            register1={register('passportFirstName', {
              required: MESSAGES.INPUT.CHECK.PASSPORT,
            })}
            error2={errors.passportLastName?.message as string}
            register2={register('passportLastName', {
              required: MESSAGES.INPUT.CHECK.PASSPORT,
            })}
          />
        </InputsContainer>
        <Button type="submit" disabled={isSubmitting}>
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
`;
const Text = styled.div`
  color: #585858;
  font-size: 14px;
  margin-bottom: 30px;
`;
const Form = styled.form`
  border-top: 1px solid #dadada;
  padding: 30px 20px 0;
`;
const InputsContainer = styled.div`
  margin-bottom: 0px;
`;
const Number = styled.div`
  border-bottom: 3px solid #101010;
  font-size: 20px;
  font-weight: semibold;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;
const Password = styled.div`
  margin: 20px 0 0;
  position: relative;
  padding-bottom: 40px;
`;
const PasswordCheck = styled.div`
  position: absolute;
  top: 95px;
  display: flex;
  align-items: center;
  color: #0cb1f3;
`;
const Button = styled.button`
  width: 100%;
  background-color: #0cb1f3;
  color: white;
  font-weight: semibold;
  height: 44px;
  border-radius: 8px;
  border: 0;
  margin-bottom: 60px;
`;
