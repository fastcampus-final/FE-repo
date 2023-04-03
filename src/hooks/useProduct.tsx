import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductList } from '@/apis/product';

const useProduct = (keyword: string) => {
  const { data } = useQuery(['productList', keyword], () => getProductList(keyword), {
    enabled: !!keyword,
  });
  return { data };
};

export default useProduct;
