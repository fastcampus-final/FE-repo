import { useRouter } from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import ArrowLeft from '@/../public/icons/arrow-left.svg';
import { Button, TextField } from '@mui/material';
import { formatUserName } from '@/utils/format';
import styled from '@emotion/styled';

import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('@/components/common/Editor'), { ssr: false });

import dayjs from 'dayjs';
import { patchBoardEdit } from '@/apis/community';

const ReviewEdit = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const [editValue, setEditValue] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const boardId = router.query.id;

  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFileName(e.target.files[0]?.name);
    setFileUrl(URL.createObjectURL(e.target.files[0]));
  }, []);

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileUrl);
    setFileUrl('');
    setFileName('');
  };

  const now = dayjs();
  const date = now.format('YYYY-MM-DD');

  return (
    <AddContent>
      <BackRouter onClick={() => router.back()}>
        <ArrowLeft />
        <p>커뮤니티</p>
      </BackRouter>

      <TitleContent>
        <p>제목</p>
        <TextField
          placeholder="제목을 입력해 주세요."
          className="title"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </TitleContent>

      <TitleImage>
        <Button onClick={onUploadImageButtonClick}>제목 이미지 업로드</Button>
        <input type="file" ref={inputRef} onChange={onUploadImage} style={{ display: 'none' }} />
        {fileName}
        {fileName !== '' ? <Button onClick={() => deleteFileImage()}>지우기</Button> : null}
      </TitleImage>

      <UserContent>
        <span className="user">{formatUserName('홍길동')}</span>
        <span>{date}</span>
      </UserContent>

      <EditorContent>
        <Editor htmlStr={editValue} setHtmlStr={setEditValue} />
      </EditorContent>

      <ButtonContent>
        <button className="white" onClick={() => router.back()}>
          취소
        </button>
        <button
          className="blue"
          onClick={() => {
            const data = {
              boardContent: JSON.stringify(editValue),
              boardThumbnail: JSON.stringify(fileUrl),
              boardTitle: keyword,
            };
            patchBoardEdit(Number(boardId), data);
          }}
        >
          저장
        </button>
      </ButtonContent>
    </AddContent>
  );
};

export default ReviewEdit;

const AddContent = styled.div`
  padding: 0 1.5rem;
`;

const BackRouter = styled.div`
  display: flex;
  margin-bottom: 50px;
  svg {
    width: 30px;
    margin-right: 10px;
  }
  p {
    margin: auto 0;
    font-size: 1.3rem;
    color: #878787;
  }
`;

const TitleContent = styled.div`
  display: flex;
  margin-bottom: 20px;
  p {
    font-size: 1.2rem;
    color: #878787;
    margin: auto 15px auto 0;
  }
  .title {
    width: 50%;
    input {
      padding: 5px;
      border: none;
    }
  }
`;

const TitleImage = styled.div``;

const UserContent = styled.div`
  color: #878787;
  text-align: right;
  margin-bottom: 20px;
  margin-right: 5px;
  .user {
    margin-right: 10px;
  }
`;

const EditorContent = styled.div`
  height: 550px;
  .quill {
    height: 90%;
    .ql-container {
      @media screen and (max-width: 500px) {
        height: 90%;
      }
    }
  }
`;

const ButtonContent = styled.div`
  margin-bottom: 30px;
  text-align: right;
  button {
    border-radius: 8px;
    margin: auto;
    width: 5rem;
    height: 2rem;
    font-weight: 600;
    border: 1px solid #0cb1f3;
  }
  .white {
    color: #0cb1f3;
    background-color: #fff;
    margin-right: 10px;
  }
  .blue {
    color: #fff;
    background-color: #0cb1f3;
  }
`;
