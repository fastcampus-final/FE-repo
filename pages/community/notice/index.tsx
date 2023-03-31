import { IReview } from '@/interfaces/community';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import data from '@/dummydata/communityNotice.json';
import styled from '@emotion/styled';
import { Pagination, TextField } from '@mui/material';

import SearchIcon from '@/../public/icons/Group.svg';
import CommunityRouter from '@/components/Community/CommunityRouter';

const Notice = () => {
  const router = useRouter();
  const [reviewData, setReviewData] = useState<Array<IReview>>([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      await setReviewData(data.content);
    };
    getData();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.nativeEvent.isComposing === false && event.key) === 'Enter') {
      console.log(keyword);
    }
  };

  const searchClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(keyword);
  };

  const pageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <NoticeContent>
      <TopArea>
        <p>
          생생한 <span className="textBold">여행후기</span>를 남겨주시고{' '}
          <span className="textBold">커피 한 잔</span>의 행운을 누려보세요.
        </p>
        <InputArea>
          <TextField
            placeholder="검색어를 입력해 주세요."
            className="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon onClick={(e: React.KeyboardEvent<HTMLInputElement>) => searchClick(e)} />
        </InputArea>
      </TopArea>

      <>
        <CommunityRouter pathname={router.pathname} />
      </>

      <BottomArea></BottomArea>

      <PageContent>
        <Pagination count={10} color="primary" page={page} onChange={pageChange} />
      </PageContent>
    </NoticeContent>
  );
};

export default Notice;

const NoticeContent = styled.div``;

const TopArea = styled.div`
  background-color: #e7f7fe;
  padding: 1rem 1.3rem;
  margin-bottom: 20px;
  display: grid;
  grid-template-rows: 5rem 3rem;
  grid-template-areas:
    'text'
    'input';
  .textBold {
    font-weight: bold;
  }
  p {
    font-size: 1.2rem;
    margin: auto;
    grid-area: text;
  }
  button {
    background-color: #0cb1f3;
    border: 1px solid #0cb1f3;
    border-radius: 8px;
    color: #fff;
    height: 50%;
    margin: auto;
    grid-area: button;
    span {
      margin-left: 5px;
      font-size: 1rem;
      z-index: 1;
    }
  }
`;

const InputArea = styled.div`
  grid-area: input;
  text-align: center;
  position: relative;
  .search {
    width: 60%;
    border-radius: 8px;
    input {
      padding: 5px;
      background-color: #fff;
    }
  }
  svg {
    position: absolute;
    right: 20%;
    width: 30px;
    height: 30px;
    margin-top: 5px;
  }
`;

const BottomArea = styled.div``;

const PageContent = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0;
`;
