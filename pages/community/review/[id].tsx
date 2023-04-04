import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import data from '@/dummydata/reviewDetail.json';
import { IReviewDetail } from '@/interfaces/community';
import styled from '@emotion/styled';
import { formatUserName } from '@/utils/format';

const ReviewDetail = () => {
  const [detailData, setDetailData] = useState<IReviewDetail>();
  const router = useRouter();

  console.log(router.query.user);

  useEffect(() => {
    const getData = async () => {
      await setDetailData(data);
    };
    getData();
  }, []);

  return (
    <DetailContent>
      <TitleContent>
        <p className="type">{detailData?.boardType}</p>
        <p className="title">{detailData?.boardTitle}</p>
      </TitleContent>

      <SummaryContent>
        <p>{formatUserName(detailData?.userName)}</p>
        <p className="date">
          {detailData?.createdDate} | {detailData?.updatedDate}
        </p>
      </SummaryContent>

      <MainContent></MainContent>
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
  .date {
    color: rgba(33, 37, 41, 0.7);
  }
`;

const MainContent = styled.div``;
