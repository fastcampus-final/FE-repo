import { useRouter } from 'next/router';
import React from 'react';

const Order = () => {
  const router = useRouter();
  const a = JSON.parse(router.query.items as string);
  console.log(a);
  return <div>Order</div>;
};

export default Order;
