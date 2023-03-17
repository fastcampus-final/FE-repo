import { ICart } from '@/interfaces/cart';
import React from 'react';

interface Props {
  data: ICart;
}

const CartItem = ({ data }: Props) => {
  return <li>{data.title}</li>;
};

export default CartItem;
