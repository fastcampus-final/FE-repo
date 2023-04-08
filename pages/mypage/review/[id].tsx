import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import DetailData from '@/dummydata/reviewDetail.json';
import { IMyReviewDetail } from '@/interfaces/myReview';
import styled from '@emotion/styled';
import MyPageNavbar from '@/components/layout/MyPageNavbar';
import PageTitle from '@/components/common/PageTitle';
import { ROUTES } from '@/constants/routes';
import { deleteBoard, getBoardDetail } from '@/apis/community';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';

import Parser from 'html-react-parser';

const MyReviewDetail = () => {
  const router = useRouter();
  const [detailData, setDetailData] = useState<IMyReviewDetail>();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // const data = await getBoardDetail(Number(router.query.id));
      // setDetailData(data);
      setDetailData(DetailData);
    })();
  });

  const deleteHandler = () => {
    return dispatch(
      setModal({
        isOpen: true,
        onClickOk: async () => {
          const deleteData = await deleteBoard(Number(detailData?.boardId));
          if (deleteData === 'ERR_BAD_REQUEST') {
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
                onClickOk: () => {
                  dispatch(setModal({ isOpen: false }));
                  router.push(ROUTES.REVIEW);
                },
                text: MESSAGES.COMMUNITY.COMPLETE_DELETE,
              }),
            );
          }
        },
        onClickCancel: () => dispatch(setModal({ isOpen: false })),
        text: MESSAGES.COMMUNITY.CONFIRM_DELETE,
      }),
    );
  };

  return (
    <Container>
      <MyPageNavbar />
      <DetailContent>
        <PageTitle title="후기 상세 정보" />

        <TitleContent>
          <p className="title">{detailData?.boardTitle}</p>
        </TitleContent>

        <DateContent>
          <p className="date">
            {detailData?.createdDate} | {detailData?.updatedDate}
          </p>
          <div className="btnWrap">
            <button
              onClick={() =>
                router.push(
                  {
                    pathname: ROUTES.REVIEW_EDIT,
                    query: {
                      boardId: detailData?.boardId,
                    },
                  },
                  ROUTES.REVIEW_EDIT,
                )
              }
            >
              수정
            </button>
            <button className="delete" onClick={() => deleteHandler()}>
              삭제
            </button>
          </div>
        </DateContent>

        <ReviewContent>
          <div>{detailData && Parser(detailData?.boardContent)}</div>
        </ReviewContent>
      </DetailContent>
    </Container>
  );
};

export default MyReviewDetail;

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1200px;
  gap: 30px;
  box-sizing: border-box;
  padding: 16px 0;
  @media (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
    flex-direction: column-reverse;
  }
  @media (max-width: 1200px) {
    padding: 16px;
  }
`;

const DetailContent = styled.div`
  width: 100%;
`;

const TitleContent = styled.div`
  text-align: center;
  margin-top: 3rem;
  margin: 3rem 0 4rem;
  .title {
    font-size: 1.5rem;
  }
`;

const DateContent = styled.div`
  display: flex;
  justify-content: space-between;
  .date {
    color: rgba(33, 37, 41, 0.7);
    margin: auto 0;
  }
  .btnWrap {
    button {
      width: 4rem;
      height: 2rem;
      border: none;
      background-color: transparent;
      font-size: 1rem;
    }
    .delete {
      color: #f84a24;
    }
  }
`;

const ReviewContent = styled.div`
  margin-top: 5rem;
`;
