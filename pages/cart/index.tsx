import CartItem from '@/components/Cart/CartItem';
import PageTitle from '@/components/common/PageTitle';
import { ICart } from '@/interfaces/cart';
import React from 'react';
import styled from 'styled-components';

const tempData: ICart[] = [
  {
    productId: '1',
    title: '호주 시드니 8일',
    price: '2699000',
    imagePath: 'https://picsum.photos/id/10/350/350',
  },
  {
    productId: '2',
    title: '다낭 골프팩 3박 5일',
    price: '1000000',
    imagePath: 'https://picsum.photos/id/20/350/350',
  },
  {
    productId: '3',
    title: '나고야 골프팩 4일',
    price: '1863000',
    imagePath: 'https://picsum.photos/id/30/350/350',
  },
];

const Cart = () => {
  return (
    <Container>
      <PageTitle title="장바구니" />
      <ul>
        {tempData?.map((item, idx) => (
          <CartItem key={idx} data={item} />
        ))}
      </ul>
    </Container>
  );
};

export default Cart;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
