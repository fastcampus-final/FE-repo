import CartCard from '@/components/Cart/CartCard';
import PageTitle from '@/components/common/PageTitle';
import { ROUTES } from '@/constants/routes';
import { ICart } from '@/interfaces/cart';
import { COLORS } from '@/styles/colors';
import { formatPrice } from '@/utils/format';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const tempData: ICart[] = [
  {
    productId: '1',
    productName: '호주 시드니 8일',
    productPrice: '2699000',
    reservationNumber: '1',
    productThumbnail: 'https://picsum.photos/id/10/350/350',
    travelDate: '20230316~20230321',
  },
  {
    productId: '2',
    productName: '다낭 골프팩 3박 5일',
    productPrice: '1000000',
    reservationNumber: '1',
    productThumbnail: 'https://picsum.photos/id/20/350/350',
    travelDate: '20230316~20230321',
  },
  {
    productId: '3',
    productName: '나고야 골프팩 4일',
    productPrice: '1863000',
    reservationNumber: '1',
    productThumbnail: 'https://picsum.photos/id/30/350/350',
    travelDate: '20230316~20230321',
  },
  {
    productId: '1',
    productName: '호주 시드니 8일',
    productPrice: '2699000',
    reservationNumber: '1',
    productThumbnail: 'https://picsum.photos/id/10/350/350',
    travelDate: '20230316~20230321',
  },
  {
    productId: '2',
    productName: '다낭 골프팩 3박 5일',
    productPrice: '1000000',
    reservationNumber: '1',
    productThumbnail: 'https://picsum.photos/id/20/350/350',
    travelDate: '20230316~20230321',
  },
];

const Cart = () => {
  const router = useRouter();
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const tempAmount = formatPrice(
      String(tempData.reduce((acc, cur) => acc + parseInt(cur.productPrice), 0)),
    );
    setAmount(tempAmount);
  }, []);

  return (
    <Container>
      <PageTitle title="장바구니" />
      <CartWrap>
        <CartList>
          {tempData?.map((item, idx) => (
            <CartCard key={idx} data={item} />
          ))}
        </CartList>
        <AmountWrap>
          <PriceText>
            <p>예약 금액</p>
            <p>{amount}</p>
          </PriceText>
          <PriceText>
            <p>할인 금액</p>
            <p>0 원</p>
          </PriceText>
          <PriceText>
            <p>총 예약 금액</p>
            <p>{amount}</p>
          </PriceText>
          <Button
            variant="contained"
            onClick={() =>
              router.push(
                {
                  pathname: ROUTES.ORDER,
                  query: {
                    amount: amount,
                    items: JSON.stringify(tempData),
                  },
                },
                '/order',
              )
            }
          >
            예약하기
          </Button>
        </AmountWrap>
      </CartWrap>
    </Container>
  );
};

export default Cart;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 16px 0;
  @media (max-width: 1200px) {
    padding: 16px;
  }
`;

const CartWrap = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const AmountWrap = styled.div`
  width: 30%;
  box-sizing: border-box;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 1px solid ${COLORS.gray};
  gap: 20px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const CartList = styled.div`
  width: 70%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const PriceText = styled.div`
  display: flex;
  justify-content: space-between;
`;
