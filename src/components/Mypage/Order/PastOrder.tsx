import { IOrder, IOrderDetail } from '@/interfaces/mypageOrder';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import ArrowRight from '@/../public/icons/arrowRight.svg';

import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';
import { getReservationDetail } from '@/apis/mypage/order';

interface Props {
  data: IOrder;
}

const PastOrder = ({ data }: Props) => {
  const router = useRouter();
  const [detailData, setDetailData] = useState<IOrderDetail>();
  const imageUrl = data.productThumbnail;

  useEffect(() => {
    (async () => {
      const detail = await getReservationDetail(data.reservationDetailId);
      setDetailData(detail);
    })();
  });

  return (
    <ListContent>
      <ImageContent image={imageUrl}></ImageContent>
      <div className="textContent">
        <p className="title">{detailData?.productName}</p>
        <p className="date">{data.startDate}</p>
      </div>

      <ArrowRight
        onClick={() =>
          router.push(
            {
              pathname: ROUTES.MYPAGE.ORDER_BY_ID(data.reservationDetailId),
              query: {
                id: data.reservationDetailId,
                status: 'past',
              },
            },
            ROUTES.MYPAGE.ORDER_BY_ID(data.reservationDetailId),
          )
        }
      />
    </ListContent>
  );
};

export default PastOrder;

const ListContent = styled.div`
  display: flex;
  margin-bottom: 1rem;
  .textContent {
    width: 70%;
    margin: auto 0;
    line-height: 1.3rem;
    .date {
      font-size: 0.7rem;
      color: rgba(0, 0, 0, 50%);
    }
  }
  svg {
    width: 10px;
  }
`;

const ImageContent = styled.div<{ image: string }>`
  /* background-image: url(${(props) => props.image}); */
  background-color: #333;
  border-radius: 50%;
  width: 10%;
  aspect-ratio: 1 / 1;
  margin-right: 20px;
  @media screen and (max-width: 1200px) {
    width: 20%;
  }
`;
