import ProductItem from '@/components/Product';
import { IProduct } from '@/interfaces/product';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import React from 'react';
import styled from '@emotion/styled';
import { instance } from '../../src/api/instance';
import THEME from '@/styles/theme';

const tempData: IProduct[] = [
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
  {
    productId: '4',
    title: '오카야마 4일',
    price: '999000',
    imagePath: 'https://picsum.photos/id/40/350/350',
  },
  {
    productId: '5',
    title: '광저우 5일',
    price: '729000',
    imagePath: 'https://picsum.photos/id/50/350/350',
  },
  {
    productId: '6',
    title: '미서부 9일 (모두투어)',
    price: '1890000',
    imagePath: 'https://picsum.photos/id/60/350/350',
  },
  {
    productId: '7',
    title: '사이판 월드 리조트 5일 (모두투어)',
    price: '1269000',
    imagePath: 'https://picsum.photos/id/70/350/350',
  },
  {
    productId: '8',
    title: '까미노 성지순례 11일',
    price: '2290000',
    imagePath: 'https://picsum.photos/id/80/350/350',
  },
  {
    productId: '9',
    title: '호주 시드니 8일',
    price: '2699000',
    imagePath: 'https://picsum.photos/id/10/350/350',
  },
  {
    productId: '10',
    title: '다낭 골프팩 3박 5일',
    price: '1000000',
    imagePath: 'https://picsum.photos/id/20/350/350',
  },
  {
    productId: '11',
    title: '나고야 골프팩 4일',
    price: '1863000',
    imagePath: 'https://picsum.photos/id/30/350/350',
  },
  {
    productId: '12',
    title: '오카야마 4일',
    price: '999000',
    imagePath: 'https://picsum.photos/id/40/350/350',
  },
  {
    productId: '13',
    title: '광저우 5일',
    price: '729000',
    imagePath: 'https://picsum.photos/id/50/350/350',
  },
  {
    productId: '14',
    title: '미서부 9일 (모두투어)',
    price: '1890000',
    imagePath: 'https://picsum.photos/id/60/350/350',
  },
  {
    productId: '15',
    title: '사이판 월드 리조트 5일 (모두투어)',
    price: '1269000',
    imagePath: 'https://picsum.photos/id/70/350/350',
  },
  {
    productId: '16',
    title: '까미노 성지순례 11일',
    price: '2290000',
    imagePath: 'https://picsum.photos/id/80/350/350',
  },
];

const getData = async () => {
  const { data } = await instance.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

interface Props {
  type?: string;
}

const Product = ({ type }: Props) => {
  const data = useQuery({
    queryKey: ['data'],
    queryFn: getData,
  });

  return (
    <Container>
      <Header>
        <ProductCount>
          {type === 'search' ? '검색 결과' : '총 상품'} <Count>{tempData.length}</Count> 개
        </ProductCount>
        <select>
          <option>최신 순</option>
          <option>상품명 순</option>
          <option>가격 오름차 순</option>
          <option>가격 내림차 순</option>
        </select>
      </Header>
      <ProductWrap>
        {tempData.map((item) => (
          <ProductItem key={item.productId} data={item} />
        ))}
      </ProductWrap>
    </Container>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['data'],
    queryFn: getData,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Product;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
`;

const ProductCount = styled.span`
  font-size: 18px;
`;

const Count = styled.span`
  font-weight: 600;
  color: ${THEME.colors.primary};
`;
