import PageTitle from '@/components/common/PageTitle';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { formatPrice } from '@/utils/format';
import { useDispatch } from 'react-redux';
import { MESSAGES } from '@/constants/messages';
import { alterModal } from '@/utils/check';
import styled from '@emotion/styled';
import { postOrder } from '@/apis/order';

interface ICssProps {
  border: string;
}
interface ICssButtonProps {
  bc: string;
  color: string;
}

const Order = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [method, setMethod] = useState('');
  const [items, setItems] = useState([
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
      alterModal(MESSAGES.ORDER.EXPIRE, dispatch);
      router.back();
    } else {
      setItems(JSON.parse(router.query.items as string));
    }
  }, [router.query.items]);

  const sum = items.reduce(
    (acc, item) =>
      acc +
      (item.numberOfPeople * item.productPrice + item.singleRoomNumber * item.singleRoomPrice),
    0,
  );

  const data = items.map((item) => {
    const dataItem = {
      productId: item.productId,
      productOptionId: item.option.productOptionId,
      reservationPeopleNumber: item.numberOfPeople,
      reservationSingleRoomNumber: item.singleRoomNumber,
    };
    return dataItem;
  });

  return (
    <div>
      <PageWrap>
        <PageTitle title="결제하기" />
      </PageWrap>
      <Container>
        <ItemWrap>
          {items.map((item) => (
            <div key={item.productId}>
              <Title border="3px solid #707070">{item.productName}</Title>
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
        <PaymentWrap>
          <Title border="0">결제방법</Title>
          <Buttons>
            <Button
              onClick={() => {
                setMethod('무통장 입금');
              }}
              bc={method === '무통장 입금' ? 'black' : 'white'}
              color={method === '무통장 입금' ? 'white' : 'black'}
            >
              무통장 입금
            </Button>
            <Button
              onClick={() => {
                setMethod('실시간 계좌이체');
              }}
              bc={method === '실시간 계좌이체' ? 'black' : 'white'}
              color={method === '실시간 계좌이체' ? 'white' : 'black'}
            >
              계좌 이체
            </Button>
          </Buttons>
        </PaymentWrap>
        <PayButton
          onClick={async () => {
            if (method === '') {
              await alterModal('입금방법을 선택해 주세요', dispatch);
            } else {
              postOrder({ method, data, router, items, dispatch });
            }
          }}
        >
          {formatPrice(sum)} 결제
        </PayButton>
      </Container>
    </div>
  );
};

export default Order;
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
  width: 943px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;
const PaymentWrap = styled.div`
  background-color: #f7f7f7;
  padding-top: 35px;
  height: 406px;
  border-radius: 8px;
  @media (max-width: 1200px) {
    height: fit-content;
  }
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  padding: 25px;
  border-bottom: ${(props: ICssProps) => props.border};
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
  padding: 40px 15px;
`;
const Button = styled.button`
  background-color: ${(props: ICssButtonProps) => props.bc};
  color: ${(props) => props.color};
  height: 40px;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 10px;
  border: 0;
  font-size: 20px;
`;
const PayButton = styled.button`
  position: absolute;
  background-color: #6dd0f8;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 100px;
  border: 0;
  border-radius: 8px;
  bottom: 0px;
  right: 0;
  @media (max-width: 1200px) {
    width: 100%;
    box-sizing: border-box;
  }
`;
