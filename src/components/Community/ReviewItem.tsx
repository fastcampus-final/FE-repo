import { ROUTES } from '@/constants/routes';
import { IReview } from '@/interfaces/community';
import { formatUserName } from '@/utils/format';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  data: IReview;
}

const ReviewItem = ({ data }: Props) => {
  const router = useRouter();
  const imageUrl = data.boardThumbnail;

  return (
    <ItemContent image={imageUrl} onClick={() => router.push(ROUTES.REVIEW_BY_ID(data.boardId))}>
      <p className="reviewTitle">{data.boardTitle}</p>
      <p className="user">{formatUserName(data.userName)}</p>
      <p className="date">{data.createdDate}</p>
    </ItemContent>
  );
};

export default ReviewItem;

const ItemContent = styled.div<{ image: string }>`
  border-radius: 8px;
  width: 22%;
  aspect-ratio: 1 / 1;
  background-color: #e9e9e9;
  filter: brightness(80%);
  /* background-image: url(${(props) => props.image}); */
  padding: 2rem;
  position: relative;
  &:hover {
    filter: brightness(100%);
    transition: all 0.5s;
  }
  .reviewTitle {
    line-height: 1.5rem;
    margin-right: 10%;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user {
    position: absolute;
    bottom: 2.2rem;
    right: 1rem;
  }
  .date {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
`;
