import { IOrder, IOrderDetail } from '@/interfaces/mypageOrder';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import ArrowRight from '@/../public/icons/arrowRight.svg';

import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';
import dayjs from 'dayjs';
import { getReservationDetail } from '@/apis/mypage/order';

interface Props {
  data: IOrder;
}

const ScheduledOrder = ({ data }: Props) => {
  const router = useRouter();
  const [detailData, setDetailData] = useState<IOrderDetail>();
  const imageUrl = data.productThumbnail;

  useEffect(() => {
    (async () => {
      const detail = await getReservationDetail(data.reservationDetailId);
      setDetailData(detail);
    })();
  });

  const today = dayjs().format('YYYY-MM-DD');
  const travelDate = dayjs(data.startDate);
  const daysAgo = travelDate.diff(today, 'day');

  return (
    <ListContent>
      <ImageContent image={imageUrl}></ImageContent>
      <div className="textContent">
        <p className="title">{detailData?.productName}</p>
        <p className="date">{data.startDate}</p>
      </div>

      <AgoContent>
        <div className="agoContent">
          <p className="agoText">{daysAgo}일 전</p>
        </div>
      </AgoContent>

      <div className="svgContent">
        <ArrowRight
          onClick={() =>
            router.push(
              {
                pathname: ROUTES.MYPAGE.ORDER_BY_ID(data.reservationDetailId),
                query: {
                  id: data.reservationDetailId,
                  status: 'scheduled',
                },
              },
              ROUTES.MYPAGE.ORDER_BY_ID(data.reservationDetailId),
            )
          }
        />
      </div>
    </ListContent>
  );
};

export default ScheduledOrder;

const ListContent = styled.div`
  display: flex;
  margin-bottom: 1rem;
  .textContent {
    width: 50%;
    margin: auto 0;
    line-height: 1.3rem;
    @media screen and (max-width: 1200px) {
      width: 40%;
    }
    .date {
      font-size: 0.7rem;
      color: rgba(0, 0, 0, 50%);
    }
  }
  .svgContent {
    margin: auto 0;
    svg {
      width: 10px;
    }
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

const AgoContent = styled.div`
  width: 20%;
  margin: auto 0;
  @media screen and (max-width: 1200px) {
    width: 30%;
  }
  .agoContent {
    background-color: #ff5555;
    color: #fff;
    border-radius: 10px;
    margin: auto;
    width: 50%;
    padding: 0.6rem;
    .agoText {
      text-align: center;
    }
  }
`;
