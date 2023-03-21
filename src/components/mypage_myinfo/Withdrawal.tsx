import React from 'react';
import PasswordModal from '../common/PasswordModal';

interface Props {
  modal?: boolean;
  setmodal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Withdrawal = ({ modal, setmodal }: Props) => {
  return (
    <div>
      <button
        onClick={() => {
          setmodal !== undefined && setmodal(true);
          console.log(modal);
        }}
      >
        개인정보(탈퇴)
      </button>
      {modal && <PasswordModal setmodal={setmodal} />}
    </div>
  );
};

export default Withdrawal;
