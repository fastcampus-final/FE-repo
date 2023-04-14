import React, { useEffect, useState } from 'react';
import { RootState } from '@/store';
import { default as ReactModal } from 'react-modal';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

import { RxCross2 } from 'react-icons/rx';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  LineShareButton,
  LineIcon,
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from './Image';
import { TextField } from '@mui/material';

declare global {
  interface Window {
    Kakao: any;
  }
}

const Modal = () => {
  const modalState = useSelector((state: RootState) => state.modal);
  const [keyword, setKeyword] = useState('');

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
      zIndex: '9999',
    },
  };

  const currentUrl = window.location.href;

  useEffect(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY);
    setKeyword(currentUrl);
  }, []);

  const kakaoShare = () => {
    const { Kakao } = window;
    Kakao.Link.sendScrap({
      requestUrl: currentUrl,
    });
  };

  if (modalState.share) {
    return (
      <ReactModal isOpen={modalState.isOpen} style={customStyles} ariaHideApp={false}>
        <ModalWrap>
          <ModalHeader>
            <p>{modalState.text}</p>
            <RxCross2 onClick={modalState.onClickOk} />
          </ModalHeader>
          <ShareContent>
            <FacebookShareButton url={currentUrl}>
              <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
            </FacebookShareButton>

            <TwitterShareButton url={currentUrl}>
              <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
            </TwitterShareButton>

            <LineShareButton url={currentUrl}>
              <LineIcon size={48} round={true} borderRadius={24}></LineIcon>
            </LineShareButton>

            <KakaoShareButton onClick={kakaoShare}>
              <Image src="https://gotogetherpictureupload.s3.ap-northeast-2.amazonaws.com/share/kakao_1681374831246.webp"></Image>
            </KakaoShareButton>
          </ShareContent>

          <UrlCopyContent>
            <TextField
              className="urlInput"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <CopyToClipboard text={keyword}>
              <Button variant="outlined">복사</Button>
            </CopyToClipboard>
          </UrlCopyContent>
        </ModalWrap>
      </ReactModal>
    );
  }
  return (
    <ReactModal isOpen={modalState.isOpen} style={customStyles} ariaHideApp={false}>
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

const ModalHeader = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ShareContent = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

const KakaoShareButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0;
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`;

const UrlCopyContent = styled.div`
  display: flex;
  input {
    padding: 5px;
  }
  button {
    padding: 3.5px;
  }
`;
