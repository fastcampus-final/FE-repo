import { ROUTES } from '@/constants/routes';
import { IMyReview } from '@/interfaces/myReview';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  data: IMyReview;
}

const ReviewList = ({ data }: Props) => {
  const router = useRouter();
  return (
    <ListContent onClick={() => router.push(ROUTES.MYPAGE.REVIEW_BY_ID(data.boardId))}>
      <p className="title">{data.boardTitle}</p>
      <p className="date">{data.createdDate}</p>
    </ListContent>
  );
};

export default ReviewList;

const ListContent = styled.div`
  padding: 1.8rem 1rem;
  border-bottom: 1px solid rgba(17, 0, 17, 30%);
  display: flex;
  justify-content: space-between;
  .title {
    font-weight: 600;
    font-size: 1.1rem;
  }
  .date {
    color: #707070;
    font-size: 0.9rem;
  }
`;
