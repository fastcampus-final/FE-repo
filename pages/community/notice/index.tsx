import { IReview } from '@/interfaces/community';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Pagination, TextField } from '@mui/material';

import SearchIcon from '@/../public/icons/Group.svg';
import CommunityRouter from '@/components/Community/CommunityRouter';
import NoticeItem from '@/components/Community/NoticeItem';
import { getBoardList } from '@/apis/community';

const Notice = () => {
  const router = useRouter();
  const [noticeData, setNoticeData] = useState<Array<IReview>>([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    (async () => {
      const data =
        keyword !== ''
          ? await getBoardList('NOTICE', page)
          : await getBoardList('NOTICE', page, keyword);
      setNoticeData(data?.content);
      setTotalPage(data.totalPages);
    })();
  }, [page]);

  const getSearchData = async () => {
    const searchData = await getBoardList('NOTICE', 1, keyword);
    setNoticeData(searchData?.content);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.nativeEvent.isComposing === false && event.key) === 'Enter') {
      getSearchData();
    }
  };

  const searchClick = () => {
    getSearchData();
  };

  const pageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <NoticeContent>
      <TopArea>
        <p>
          고투게더의 <span className="textBold">공지사항</span>과
          <span className="textBold"> 이벤트 정보</span>를 확인해보세요.
        </p>
        <InputArea>
          <TextField
            placeholder="검색어를 입력해 주세요."
            className="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon onClick={() => searchClick()} />
        </InputArea>
      </TopArea>

      <>
        <CommunityRouter pathname={router.pathname} />
      </>

      <BottomArea>
        {noticeData && noticeData.length > 0 ? (
          noticeData.map((item, i) => (
            <NoticeItem
              key={item.boardId}
              data={item}
              prev={noticeData[i - 1]?.boardId ? noticeData[i - 1]?.boardId : undefined}
              next={noticeData[i + 1]?.boardId ? noticeData[i + 1]?.boardId : undefined}
              length={noticeData.length}
            />
          ))
        ) : (
          <h3>공지사항이 존재하지 않습니다.</h3>
        )}
      </BottomArea>

      <PageContent>
        {totalPage > 1 && (
          <Pagination count={totalPage} color="primary" page={page} onChange={pageChange} />
        )}
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
    cursor: pointer;
    position: absolute;
    right: 20%;
    width: 30px;
    height: 30px;
    margin-top: 5px;
  }
`;

const BottomArea = styled.div`
  h3 {
    margin-top: 50px;
    text-align: center;
  }
  @media screen and (min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }

  @media screen and (max-width: 1200px) {
    padding: 0 10rem;
  }

  @media screen and (max-width: 500px) {
    padding: 0 18px;
  }
`;

const PageContent = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0;
`;
