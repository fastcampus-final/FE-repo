import PageTitle from '@/components/common/PageTitle';
import { formatPrice } from '@/utils/format';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface IItemsProps {
  cartId: number;
  numberOfPeople: number;
  option: {
    endDate: string;
    productOptionId: number;
    startDate: string;
  };
  productId: number;
  productName: string;
  productOptions: {
    endDate: string;
    productOptionId: number;
    startDate: string;
  }[];
  productPrice: number;
  productThumbnail: string;
  singleRoomNumber: number;
  singleRoomPrice: number;
}

interface ICssProps {
  border: string;
  bc: string;
  color: string;
}

const success = () => {
  const router = useRouter();
  const [items, setitems] = useState([
    {
      cartId: 0,
      numberOfPeople: 0,
      option: {
        endDate: '',
        productOptionId: 0,
        startDate: '',
      },
      productId: 0,
      productName: '',
      productOptions: [
        {
          endDate: '',
          productOptionId: 0,
          startDate: '',
        },
      ],
      productPrice: 0,
      productThumbnail: '',
      singleRoomNumber: 0,
      singleRoomPrice: 0,
    },
  ]);

  useEffect(() => {
    if (router.query.items === undefined) {
      router.push('/');
    } else {
      setitems(JSON.parse(router.query.items as string));
    }
  }, []);

  const sum = items.reduce(
    (acc, item) =>
      acc +
      (item.numberOfPeople * item.productPrice + item.singleRoomNumber * item.singleRoomPrice),
    0,
  );

  return (
    <div>
      <PageWrap>
        <PageTitle title="결제하기" />
        결제가 완료되었습니다.
      </PageWrap>
      <Container>
        <ItemWrap>
          {items.map((item) => (
            <div key={item.productId}>
              <Title>{item.productName}</Title>
              <TravelInfo>
                <TravelDate>
                  <TravelTitle>여행 예정일</TravelTitle>
                  <div>
                    {item.option.startDate.split('-').join('.')} ~{' '}
                    {item.option.endDate.split('-').join('.')}
                  </div>
                </TravelDate>
                <TravelDate>
                  <TravelTitle>인원 수</TravelTitle>
                  <TravelTitle>{item.numberOfPeople}명</TravelTitle>
                </TravelDate>
              </TravelInfo>
            </div>
          ))}
          <AllPrice>
            <TravelTitle>전체금액</TravelTitle>
            <TotalPrice>
              <PriceTitle>결제 금액 (세금 포함)</PriceTitle>
              <Price>{formatPrice(sum)}</Price>
            </TotalPrice>
          </AllPrice>
        </ItemWrap>
        <Buttons>
          <Button
            border="1px solid black"
            bc="white"
            color="black"
            onClick={() => {
              router.push('/');
            }}
          >
            메인 페이지로 돌아가기
          </Button>
          <Button
            border="0"
            bc="#6DD0F8"
            color="white"
            onClick={() => {
              router.push('/mypage/order');
            }}
          >
            예약 확인
          </Button>
        </Buttons>
      </Container>
    </div>
  );
};

export default success;

const PageWrap = styled.div`
  margin: 0 10px 40px;
`;
const Container = styled.div`
  margin: 0 10px 40px;
  display: flex;
  gap: 20px;
  flex-direction: row;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
  position: relative;
  padding-bottom: 60px;
`;
const ItemWrap = styled.div`
  background-color: #f7f7f7;
  padding: 35px;
  box-sizing: border-box;
  border-radius: 8px;
  min-width: 943px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  padding: 25px;
  border-bottom: 3px solid #707070;
`;
const TravelInfo = styled.div`
  padding: 25px;
  border-bottom: 3px solid #707070;
`;
const TravelDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 45px;
`;
const TravelTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
`;
const AllPrice = styled.div`
  padding: 25px;
`;
const TotalPrice = styled.div`
  margin-top: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PriceTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #707070;
`;
const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #0cb1f3;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Button = styled.button`
  width: 100%;
  border: ${(props: ICssProps) => props.border};
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: ${(props) => props.bc};
  color: ${(props) => props.color};
  height: 40px;
`;
