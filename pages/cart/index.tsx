import { getCart } from '@/apis/cart';
import CartCard from '@/components/Cart/CartCard';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { ROUTES } from '@/constants/routes';
import { ICart } from '@/interfaces/cart';
import { RootState } from '@/store';
import { setCartState } from '@/store/cart';
import { COLORS } from '@/styles/colors';
import { formatPrice } from '@/utils/format';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const cartList: ICart[] = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    (async () => {
      const data = await getCart();
      dispatch(setCartState(data));
      setAmount(formatPrice(data.reduce((acc: number, cur: ICart) => acc + cur.productPrice, 0)));
    })();
  }, []);

  return (
    <Container>
      <PageTitle title="장바구니" />
      <CartWrap>
        <CartList>
          {cartList && cartList.map((item, idx) => <CartCard key={idx} data={item} />)}
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
                    items: JSON.stringify(cartList),
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

export default withAuth(Cart);

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
  width: 40%;
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
  width: 60%;
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
