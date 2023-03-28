import { IWithdrawalProps } from '@/interfaces/withdrawal';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import PasswordModal from '../common/PasswordModal';

const Withdrawal = ({ modal, setmodal }: IWithdrawalProps) => {
  const router = useRouter();

  return (
    <>
      {router.asPath === '/login' && (
        <div>비밀번호를 잊어버리셨다면 비밀번호 찾기 버튼을 눌러주세요.</div>
      )}
      <Button
        onClick={() => {
          setmodal !== undefined && setmodal(true);
        }}
      >
        {router.asPath === '/login' ? '비밀번호 찾기' : '개인정보(탈퇴)'}
      </Button>
      {modal && <PasswordModal setmodal={setmodal} />}
    </>
  );
};

export default Withdrawal;
