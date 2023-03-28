import { IWithdrawalProps } from '@/interfaces/withdrawal';
import React from 'react';
import PasswordModal from '../common/PasswordModal';

const SearchPassword = ({ modal, setmodal }: IWithdrawalProps) => {
  return (
    <div>
      <button
        onClick={() => {
          setmodal !== undefined && setmodal(true);
        }}
      >
        개인정보(탈퇴)
      </button>
      {modal && <PasswordModal setmodal={setmodal} />}
    </div>
  );
};

export default SearchPassword;
