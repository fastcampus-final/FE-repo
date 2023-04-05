import { ROUTES } from '@/constants/routes';
import { IReview } from '@/interfaces/community';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  data: IReview;
}

const NoticeItem = ({ data }: Props) => {
  const router = useRouter();

  return (
    <ItemContent
      onClick={() =>
        router.push(
          {
            pathname: ROUTES.NOTICE_BY_ID(data.boardId),
            query: {
              id: data.boardId,
            },
          },
          ROUTES.NOTICE_BY_ID(data.boardId),
        )
      }
    >
      <p className="title">{data.boardTitle}</p>
      <p className="user">
        {data.userName} {data.createdDate}
      </p>
    </ItemContent>
  );
};

export default NoticeItem;

const ItemContent = styled.div`
  height: 3rem;
  margin: auto;
  border-bottom: 1px solid #b7b7b7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  &:first-child {
    border-top: 1px solid #585858;
  }
  .user {
    color: #878787;
    margin-left: auto;
  }
`;
