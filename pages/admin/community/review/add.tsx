import withAuth from '@/components/common/PrivateRouter';
import React, { useRef, useState } from 'react';

import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import ArrowLeft from '@/../public/icons/arrow-left.svg';
import { useRouter } from 'next/router';

import { postBoardAdd } from '@/apis/community';
import dayjs from 'dayjs';
import { ROUTES } from '@/constants/routes';

import dynamic from 'next/dynamic';
import { uploadImage } from '@/apis/common';

const Editor = dynamic(() => import('@/components/common/Editor'), { ssr: false });

const ReviewAddForm = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const [editValue, setEditValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const res = await uploadImage(file as unknown as string, 'review');
      setFileUrl(res);
    };

    setFileName(e.target.files[0]?.name);
  };

  const onUploadImageButtonClick = async () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileUrl);
    setFileUrl('');
    setFileName('');
  };

  const onSubmit = () => {
    const data = {
      boardContent: JSON.stringify(editValue),
      boardThumbnail: fileUrl,
      boardTitle: keyword,
      boardType: '여행후기',
    };

    postBoardAdd(data);
    router.push(ROUTES.ADMIN.REVIEW);
  };

  const now = dayjs();
  const date = now.format('YYYY-MM-DD');

  return (
    <AddContent>
      <BackRouter onClick={() => router.back()}>
        <ArrowLeft />
        <p>여행 후기 관리</p>
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
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={onUploadImage}
        />
        {fileName}
        {fileName !== '' ? <Button onClick={() => deleteFileImage()}>지우기</Button> : null}
      </TitleImage>

      <UserContent>
        <span className="user">관리자</span>
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
            onSubmit();
          }}
        >
          저장
        </button>
      </ButtonContent>
    </AddContent>
  );
};

export default withAuth(ReviewAddForm);

const AddContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
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
  height: 500px;
  .rdw-editor-wrapper {
    height: 100%;
  }
`;

const ButtonContent = styled.div`
  margin-bottom: 5px;
  margin-top: 120px;
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
