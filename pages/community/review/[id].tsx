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

const ReviewDetail = () => {
  const [detailData, setDetailData] = useState<IReviewDetail>();
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    const getData = async () => {
      const data = await getBoardDetail(Number(router.query.id));
      setDetailData(data);
    };

    getData();
  }, []);

  const markUp = () => {
    if (detailData?.boardContent !== undefined) {
      return { __html: JSON.parse(detailData?.boardContent) };
    }
  };

  const deleteHandler = async () => {
    const deleteData = deleteBoard(Number(detailData?.boardId));
    if ((await deleteData) === 'ERR_BAD_REQUEST') {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.COMMUNITY.ERROR_DELETE,
        }),
      );
    } else {
      router.push(ROUTES.REVIEW);
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () =>
            dispatch(
              setModal({
                isOpen: false,
              }),
            ),
          text: MESSAGES.COMMUNITY.COMPLETE_DELETE,
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
        {cookies.accessToken && cookies.length > 0 && detailData?.userName !== '관리자' ? (
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
            <button
              className="delete"
              onClick={() => {
                deleteHandler();
              }}
            >
              삭제
            </button>
          </div>
        ) : null}
      </SummaryContent>

      <MainContent>
        <div dangerouslySetInnerHTML={markUp()}></div>
      </MainContent>

      {router.query.i !== '0' ? (
        <PrevNextContent>
          <SlArrowUp size={20} />
          <p onClick={() => router.push(ROUTES.REVIEW_BY_ID(Number(router.query.id) - 1))}>
            이전 후기 보기
          </p>
        </PrevNextContent>
      ) : null}

      {Number(router.query.i) !== Number(router.query.length) - 1 ? (
        <PrevNextContent>
          <SlArrowDown size={20} />
          <p onClick={() => router.push(ROUTES.REVIEW_BY_ID(Number(router.query.id) + 1))}>
            다음 후기 보기
          </p>
        </PrevNextContent>
      ) : null}

      <ButtonContent>
        <button onClick={() => router.push(ROUTES.REVIEW)}>목록</button>
        <button onClick={() => router.push(ROUTES.REVIEW_ADD)}>글쓰기</button>
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
