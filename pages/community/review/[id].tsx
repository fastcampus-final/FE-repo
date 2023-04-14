import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { IReviewDetail } from '@/interfaces/community';
import styled from '@emotion/styled';
import { formatUserName } from '@/utils/format';

import { SlArrowUp, SlArrowDown } from 'react-icons/sl';
import { ROUTES } from '@/constants/routes';
import { deleteBoard, getBoardDetail } from '@/apis/community';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';
import Parser from 'html-react-parser';
import { getUserInfo } from '@/apis/main';

const ReviewDetail = () => {
  const [detailData, setDetailData] = useState<IReviewDetail>();
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies();
  const [user, setUser] = useState('');

  useEffect(() => {
    (async () => {
      const reviewId = window.location.pathname.slice(18);
      const data = await getBoardDetail(Number(router.query.id) | Number(reviewId));
      setDetailData(data);

      if (cookies.accessToken) {
        const userData = await getUserInfo();
        setUser(userData.userName);
      }
    })();
  }, [window.location.pathname]);

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

  const moveLogin = () => {
    if (cookies.accessToken && cookies.length > 0) {
      router.push(ROUTES.REVIEW_ADD);
    } else {
      return dispatch(
        setModal({
          isOpen: true,
          text: MESSAGES.INVALID_AUTH,
          onClickOk: () => {
            dispatch(
              setModal({
                isOpen: false,
              }),
            ),
              router.push(ROUTES.LOGIN);
          },
        }),
      );
    }
  };

  return (
    <DetailContent>
      <TitleContent>
        <p className="type">{detailData?.boardType}</p>
        <p className="title">{detailData?.boardTitle}</p>
      </TitleContent>

      <SummaryContent>
        <div>
          <p>{formatUserName(detailData?.userName)}</p>
          <p className="date">
            {detailData?.createdDate} | {detailData?.updatedDate}
          </p>
        </div>
        {cookies.accessToken && detailData?.userName === user ? (
          <div>
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
        ) : null}
      </SummaryContent>

      <MainContent>
        <div>{detailData?.boardContent && Parser(detailData.boardContent)}</div>
      </MainContent>

      {router.query.prev !== '' ? (
        <PrevNextContent>
          <SlArrowUp size={20} />
          <p onClick={() => router.push(ROUTES.REVIEW_BY_ID(Number(router.query.prev)))}>
            이전 후기 보기
          </p>
        </PrevNextContent>
      ) : null}

      {router.query.next !== '' ? (
        <PrevNextContent>
          <SlArrowDown size={20} />
          <p onClick={() => router.push(ROUTES.REVIEW_BY_ID(Number(router.query.next)))}>
            다음 후기 보기
          </p>
        </PrevNextContent>
      ) : null}

      <ButtonContent>
        <button onClick={() => router.push(ROUTES.REVIEW)}>목록</button>
        <button onClick={() => moveLogin()}>글쓰기</button>
      </ButtonContent>
    </DetailContent>
  );
};

export default ReviewDetail;

const DetailContent = styled.div`
  margin: 0 auto;
  padding: 0 10rem;
  @media screen and (max-width: 1200px) {
    padding: 16px;
  }
`;

const TitleContent = styled.div`
  margin-bottom: 5rem;
  text-align: center;
  .type {
    color: #878787;
    padding: 0 0 20px;
    margin: 20px 0;
    position: relative;
    display: inline-block;
    letter-spacing: 2px;
    &::before {
      content: ' ';
      background-color: rgba(33, 37, 41, 0.3);
      width: 30px;
      height: 1px;
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -15px;
    }
  }
  .title {
    font-size: 1.714rem;
  }
`;

const SummaryContent = styled.div`
  line-height: 1.3rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  .date {
    color: rgba(33, 37, 41, 0.7);
  }
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
`;

const MainContent = styled.div`
  margin-bottom: 50px;
`;

const PrevNextContent = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  height: 2.5rem;
  gap: 1rem;
  svg {
    width: 5%;
    margin: auto 0;
  }
  p {
    margin: auto 0;
  }
`;

const ButtonContent = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    background-color: #0cb1f3;
    color: #fff;
    border-radius: 8px;
    width: 5rem;
    height: 2rem;
  }
`;
