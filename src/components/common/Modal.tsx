import React from 'react';
import { RootState } from '@/store';
import { default as ReactModal } from 'react-modal';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const Modal = () => {
  const modalState = useSelector((state: RootState) => state.modal);

  const customStyles = {
    content: {
      width: '250px',
      height: '160px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '10px',
      borderRadius: '10px',
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      zIndex: '100',
    },
  };

  return (
    <ReactModal isOpen={modalState.isOpen} style={customStyles}>
      <ModalWrap>
        <ModalText>
          <p>{modalState.text}</p>
        </ModalText>
        <ButtonWrap>
          <Button variant="contained" onClick={modalState.onClickOk}>
            {modalState.okText ? modalState.okText : '확인'}
          </Button>
          {modalState.onClickCancel && (
            <Button variant="outlined" onClick={modalState.onClickCancel}>
              {modalState.cancelText ? modalState.cancelText : '취소'}
            </Button>
          )}
        </ButtonWrap>
      </ModalWrap>
    </ReactModal>
  );
};

export default Modal;

const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.6;
  white-space: pre-wrap;
  height: 80px;
  padding: 16px 0 12px 0;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
