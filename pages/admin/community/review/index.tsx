import { getBoardList } from '@/apis/community';
import AdminTableHead from '@/components/common/AdminTableHead';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { ROUTES } from '@/constants/routes';
import { IReview } from '@/interfaces/community';
import styled from '@emotion/styled';
import { BsSearch } from 'react-icons/bs';
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Review = () => {
  const router = useRouter();
  const [review, setReview] = useState<Array<IReview>>([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    (async () => {
      const reviewData =
        keyword !== ''
          ? await getBoardList('TRAVEL_REVIEW', page)
          : await getBoardList('TRAVEL_REVIEW', page, keyword);
      setReview(reviewData?.content);
      setTotalPage(reviewData.totalPages);
    })();
  }, []);

  const getSearchData = async () => {
    const searchData = await getBoardList('TRAVEL_REVIEW', 1, keyword);
    setReview(searchData?.content);
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
    <Container>
      <PageTitle title="여행 후기 관리" fontSize="20px" padding="10px" />
      <InputArea>
        <TextField
          placeholder="검색어를 입력해 주세요."
          className="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="outlined" className="searchBtn" onClick={() => searchClick()}>
          <BsSearch size={23} />
        </Button>
      </InputArea>
      <TableWrap>
        <Table>
          <AdminTableHead titles={['번호', '제목', '작성자', '작성일']} />
          <TableBody>
            {review && review.length > 0 ? (
              review.map((item, idx) => (
                <TableRow
                  key={idx}
                  style={{ cursor: 'pointer' }}
                  hover
                  onClick={() =>
                    router.push(
                      {
                        pathname: ROUTES.ADMIN.REVIEW_BY_ID(String(item.boardId)),
                        query: {
                          id: item.boardId,
                          image: item.boardThumbnail,
                        },
                      },
                      ROUTES.ADMIN.REVIEW_BY_ID(String(item.boardId)),
                    )
                  }
                >
                  <TableCell align="center" width="200px">
                    {(page - 1) * 10 + idx + 1}
                  </TableCell>
                  <TableCell align="center">{item.boardTitle}</TableCell>
                  <TableCell align="center">{item.userName}</TableCell>
                  <TableCell align="center">{item.createdDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <EmptyText>등록된 상품이 없습니다.</EmptyText>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <BottomArea>
          {totalPage > 1 && (
            <Pagination count={totalPage} color="primary" page={page} onChange={pageChange} />
          )}
          <Button
            className="addBtn"
            variant="outlined"
            onClick={() => router.push(ROUTES.ADMIN.REVIEW_ADD)}
          >
            등록
          </Button>
        </BottomArea>
      </TableWrap>
    </Container>
  );
};

export default withAuth(Review);

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

const TableWrap = styled.div`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 2rem;
`;

const EmptyText = styled.p`
  width: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
`;

const InputArea = styled.div`
  text-align: center;
  position: absolute;
  top: 25px;
  right: 4%;
  .search {
    width: 20rem;
    border-radius: 8px;
    margin-right: 1rem;
    input {
      padding: 5px;
      background-color: #fff;
    }
  }
  .searchBtn {
    padding: 4px;
  }
`;

const BottomArea = styled.div`
  width: 100%;
  position: relative;
  ul {
    justify-content: center;
  }
  .addBtn {
    position: absolute;
    right: 10px;
    top: 0;
  }
`;
