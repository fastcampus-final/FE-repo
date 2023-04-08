import withAuth from '@/components/common/PrivateRouter';
import React, { useState } from 'react';

import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import ArrowLeft from '@/../public/icons/arrow-left.svg';
import { useRouter } from 'next/router';

import { postBoardAdd } from '@/apis/community';
import dayjs from 'dayjs';
import { ROUTES } from '@/constants/routes';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/common/Editor'), { ssr: false });

const NoticeAddForm = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const [editValue, setEditValue] = useState<string>('');

  const onSubmit = () => {
    const data = {
      boardContent: editValue,
      boardThumbnail: '',
      boardTitle: keyword,
      boardType: '알려드려요',
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
        <p>공지사항 관리</p>
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

export default withAuth(NoticeAddForm);

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
