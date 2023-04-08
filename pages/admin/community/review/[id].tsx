import withAuth from '@/components/common/PrivateRouter';
import React, { useEffect, useState } from 'react';

import DetailData from '@/dummydata/reviewDetail.json';
import { IReviewDetail } from '@/interfaces/community';
import { useRouter } from 'next/router';
import { deleteBoard, getBoardDetail } from '@/apis/community';
import styled from '@emotion/styled';
import PageTitle from '@/components/common/PageTitle';
import { Table, TableCell, TableRow } from '@mui/material';
import Parser from 'html-react-parser';
import { ROUTES } from '@/constants/routes';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';
import Image from '@/components/common/Image';

const ReviewDetail = () => {
  const router = useRouter();
  const [detailData, setDetailData] = useState<IReviewDetail>();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      // const data = await getBoardDetail(Number(router.query.id));
      // setDetailData(data);
      setDetailData(DetailData);
    })();
  }, []);

  const deleteHandler = async () => {
    const deleteData = await deleteBoard(Number(detailData?.boardId));
    if ((await deleteData) === 'ERR_BAD_REQUEST') {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.COMMUNITY.ERROR_DELETE,
        }),
      );
    } else {
      return dispatch(
        setModal({
          isOpen: true,
          text: MESSAGES.COMMUNITY.COMPLETE_DELETE,
          onClickOk: () => {
            dispatch(
              setModal({
                isOpen: false,
              }),
            ),
              router.push(ROUTES.ADMIN.REVIEW);
          },
        }),
      );
    }
  };

  return (
    <Container>
      <PageTitle title="후기 상세 정보" fontSize="20px" padding="10px" />
      <DetailContent>
        <Table>
          <TableRow>
            <TableCell align="center">썸네일</TableCell>
            <TableCell align="left" colSpan={3}>
              <Image
                src={router.query.image && String(router.query.image)}
                alt={detailData && detailData.boardTitle}
                width="330px"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" width="15%">
              후기 제목
            </TableCell>
            <TableCell align="left" width="30%">
              {detailData && detailData.boardTitle}
            </TableCell>
            <TableCell align="center">작성자</TableCell>
            <TableCell align="left">{detailData && detailData.userName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" width="15%">
              작성일
            </TableCell>
            <TableCell align="left" width="30%">
              {detailData && detailData.createdDate}
            </TableCell>
            <TableCell align="center">수정일</TableCell>
            <TableCell align="left">{detailData && detailData.updatedDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              {detailData && Parser(detailData.boardContent)}
            </TableCell>
          </TableRow>
        </Table>
        <ButtonContent>
          <button className="white" onClick={() => router.push(ROUTES.ADMIN.REVIEW_EDIT)}>
            수정
          </button>
          <button className="blue" onClick={() => deleteHandler()}>
            삭제
          </button>
        </ButtonContent>
      </DetailContent>
    </Container>
  );
};

export default withAuth(ReviewDetail);

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

const DetailContent = styled.div`
  margin-top: 2rem;
`;

const ButtonContent = styled.div`
  margin-bottom: 5px;
  margin-top: 20px;
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
