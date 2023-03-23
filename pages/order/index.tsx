import { useRouter } from 'next/router';
import React from 'react';

const index = () => {
  const router = useRouter();
  const a = JSON.parse(router.query.items as string);
  console.log(a);
  return <div>index</div>;
};

export default index;
