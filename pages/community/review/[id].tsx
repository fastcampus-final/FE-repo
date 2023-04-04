import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import data from '@/dummydata/reviewDetail.json';
import { IReviewDetail } from '@/interfaces/community';
import styled from '@emotion/styled';
import { formatUserName } from '@/utils/format';

import { SlArrowUp, SlArrowDown } from 'react-icons/sl';
import { ROUTES } from '@/constants/routes';

const ReviewDetail = () => {
  const [detailData, setDetailData] = useState<IReviewDetail>();
  const router = useRouter();
  const viewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getData = async () => {
      await setDetailData(data);
    };

    const innerHtml = () => {
      if (viewContainerRef.current) {
        viewContainerRef.current.innerHTML = '';
        viewContainerRef.current.innerHTML += detailData?.boardContent;
      }
    };
    getData();
    innerHtml();
  }, []);

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
          <button className="delete">삭제</button>
        </div>
      </SummaryContent>

      <MainContent>
        <div ref={viewContainerRef} />
      </MainContent>

      <PrevNextContent>
        <SlArrowUp size={20} />
        <p onClick={() => router.push(ROUTES.REVIEW_BY_ID(Number(router.query.id) - 1))}>
          이전 페이지
        </p>
      </PrevNextContent>

      <PrevNextContent>
        <SlArrowDown size={20} />
        <p onClick={() => router.push(ROUTES.REVIEW_BY_ID(Number(router.query.id) + 1))}>
          다음 페이지
        </p>
      </PrevNextContent>

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
