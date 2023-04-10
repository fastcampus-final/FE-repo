import { getCart } from '@/apis/cart';
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

const Cart = () => {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState<ICart[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getCart();
      setProduct(data);
    })();
  }, []);

  useEffect(() => {
    const amount = formatPrice(product.reduce((acc, cur) => acc + cur.productPrice, 0));
    setAmount(amount);
  }, []);

  return (
    <Container>
      <PageTitle title="장바구니" />
      <CartWrap>
        <CartList>
          {product && product.map((item, idx) => <CartCard key={idx} data={item} />)}
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
                    items: JSON.stringify(product),
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
