import PageTitle from '@/components/common/PageTitle';
import MyPageNavbar from '@/components/layout/MyPageNavbar';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import ReviewData from '@/dummydata/myReviewList.json';
import { IMyReview } from '@/interfaces/myReview';
import ReviewList from '@/components/Mypage/Review/ReviewList';
import { getMyReviewList } from '@/apis/mypage/review';

const MyReview = () => {
  const [reviewData, setReviewData] = useState<Array<IMyReview>>([]);

  useEffect(() => {
    (async () => {
      // const data = await getMyReviewList();
      // setReviewData(data.content);
      setReviewData(ReviewData.content);
    })();
  });
  return (
    <Container>
      <MyPageNavbar />
      <MyReviewContent>
        <PageTitle title="나의 여행 후기" />

        <ListContent>
          {reviewData && reviewData.length > 0 ? (
            reviewData.map((item) => <ReviewList key={item.boardId} data={item} />)
          ) : (
            <p>목록이 존재하지 않습니다.</p>
          )}
        </ListContent>
      </MyReviewContent>
    </Container>
  );
};

export default MyReview;

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

const MyReviewContent = styled.div`
  width: 100%;
`;

const ListContent = styled.div`
  margin-top: 2rem;
`;
