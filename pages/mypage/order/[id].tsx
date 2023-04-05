import PageTitle from '@/components/common/PageTitle';
import MyPageNavbar from '@/components/layout/MyPageNavbar';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import DetailData from '@/dummydata/orderDetail.json';
import { IOrderDetail } from '@/interfaces/mypageOrder';
import dayjs from 'dayjs';
import { formatPrice } from '@/utils/format';

const MyOrderDetail = () => {
  const [detailData, setDetailData] = useState<IOrderDetail>();

  useEffect(() => {
    (async () => {
      setDetailData(DetailData);
    })();
  });

  const imageUrl = detailData?.productThumbnail as string;

  const orderDate = dayjs(detailData?.reservationDate).format('YYYY-MM-DD HH:mm');

  return (
    <Container>
      <MyPageNavbar />
      <DetailContent>
        <PageTitle title="예약 상세 현황" />

        <ImageContent image={imageUrl}></ImageContent>

        <InfoTopContent>
          <p className="productTitle">{detailData?.productName}</p>
          <div className="dateContent">
            <div className="dateWrap">
              <p className="subTitle">출발일</p>
              <p className="date">{detailData?.startDate}</p>
            </div>
            <div className="dateWrap">
              <p className="subTitle">도착일</p>
              <p className="date">{detailData?.endDate}</p>
            </div>
          </div>
          <div className="dateWrap">
            <p className="subTitle">인원 수</p>
            <p className="date">{detailData?.reservationPeopleNumber}</p>
          </div>
        </InfoTopContent>

        <InfoBottomContent>
          <p className="subTitle">결제 정보</p>
          <p className="orderDate">결제 일시 {orderDate}</p>
          <div className="orderWrap">
            <p className="title">결제 상태</p>
            <p className="value">{detailData?.reservationStatus}</p>
          </div>
          <div className="orderWrap">
            <p className="title">상품 가격</p>
            <p className="value">{formatPrice(Number(detailData?.detailTotalPrice))}</p>
          </div>
        </InfoBottomContent>

        <ButtonContent>
          <button className="share">예약 일정 공유하기</button>
          <button className="delete">예약 취소</button>
        </ButtonContent>
      </DetailContent>
    </Container>
  );
};

export default MyOrderDetail;

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

const DetailContent = styled.div`
  width: 100%;
`;

const ImageContent = styled.div<{ image: string }>`
  /* background-image: url(${(props) => props.image}); */
  background-color: #777;
  width: 100%;
  height: 15rem;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const InfoTopContent = styled.div`
  padding: 1rem 1rem 2rem;
  border-bottom: 1px solid #707070;
  .productTitle {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }
  .dateContent {
    display: flex;
    margin-bottom: 1.5rem;
  }
  .dateWrap {
    width: 50%;
    display: flex;
    .subTitle {
      color: #707070;
      margin-right: 1rem;
    }
  }
`;

const InfoBottomContent = styled.div`
  padding: 2rem 1rem 1rem;
  margin-bottom: 1.3rem;
  .subTitle {
    color: #707070;
    margin-bottom: 0.5rem;
  }
  .orderDate {
    font-size: 0.9rem;
    margin-bottom: 3rem;
  }
  .orderWrap {
    display: flex;
    margin-bottom: 1rem;
    .title {
      width: 50%;
      color: #878787;
      font-size: 0.9rem;
    }
  }
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  button {
    border-radius: 8px;
    height: 2.7rem;
    margin-bottom: 0.8rem;
    font-size: 1rem;
    font-weight: 600;
  }
  .share {
    background-color: #fff;
    border: 1px solid #101010;
    color: #101010;
  }
  .delete {
    background-color: #f84a24;
    border: 1px solid #f84a24;
    color: #fff;
  }
`;
