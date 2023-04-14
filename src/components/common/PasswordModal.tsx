import { MESSAGES } from '@/constants/messages';
import { IPasswordModal } from '@/interfaces/passwordModal';
import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { deleteMyAccount, searchMyPassword } from '../../apis/mypage/info';
import Input from './Input';
import EmailInput from '../SignIn/EmailInput';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const PasswordModal = ({ setmodal }: IPasswordModal) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [, , removeCookies] = useCookies();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <Background>
      <Container>
        <ButtonContainer>
          <Button
            onClick={() => {
              setmodal !== undefined && setmodal(false);
              document.body.style.removeProperty('overflow');
            }}
          >
            <ClearIcon />
          </Button>
        </ButtonContainer>
        <FormContainer>
          {router.asPath === '/login' ? (
            <Form
              onSubmit={handleSubmit(async (data) => {
                searchMyPassword(data, dispatch);
              })}
            >
              <EmailInput
                error={errors.email?.message as string}
                register={register('email', {
                  required: MESSAGES.INPUT.CHECK.EMAIL,
                })}
              />
              <Button type="submit" disabled={isSubmitting}>
                비밀번호 발송
              </Button>
            </Form>
          ) : (
            <Form
              onSubmit={handleSubmit(async (data) => {
                if (confirm(MESSAGES.MYPAGE.WITHDRAWAL.CONFIRM)) {
                  await deleteMyAccount(data, dispatch, router, removeCookies);
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
            </Form>
          )}
        </FormContainer>
      </Container>
    </Background>
  );
};

export default PasswordModal;

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  margin: 20px;
  width: 100%;
  max-width: 335px;
  height: 30%;
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
