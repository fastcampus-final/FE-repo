import { IWithdrawalProps } from '@/interfaces/withdrawal';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import PasswordModal from '../common/PasswordModal';
import Image from 'next/image';

const Withdrawal = ({ modal, setmodal }: IWithdrawalProps) => {
  const router = useRouter();

  return (
    <Container>
      {router.asPath === '/login' && (
        <div>비밀번호를 잊어버리셨다면 비밀번호 찾기 버튼을 눌러주세요.</div>
      )}
      <Button
        onClick={() => {
          setmodal !== undefined && setmodal(true);
        }}
      >
        {router.asPath === '/login' ? (
          <div>비밀번호 찾기</div>
        ) : (
          <ButtonContainer>
            <div>
              <Image src="/icons/Withdrawal.svg" alt="회원탈퇴" width={24} height={24} />
            </div>
            <div>회원 탈퇴</div>
          </ButtonContainer>
        )}
      </Button>
      {modal && <PasswordModal setmodal={setmodal} />}
    </Container>
  );
};

export default Withdrawal;

const Container = styled.div`
  display: flex;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 15px;
  color: black;
`;
