import ProductItem from '@/components/Product';
import { IProduct } from '@/interfaces/product';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import React from 'react';
import styled from '@emotion/styled';
import { instance } from '../../src/api/instance';
import { COLORS } from '@/styles/colors';
import { MenuItem, Select } from '@mui/material';

const tempData: IProduct[] = [
  {
    productId: '1',
    productName: '호주 시드니 8일',
    productPrice: '2699000',
    productThumbnail: 'https://picsum.photos/id/10/350/350',
  },
  {
    productId: '2',
    productName: '다낭 골프팩 3박 5일',
    productPrice: '1000000',
    productThumbnail: 'https://picsum.photos/id/20/350/350',
  },
  {
    productId: '3',
    productName: '나고야 골프팩 4일',
    productPrice: '1863000',
    productThumbnail: 'https://picsum.photos/id/30/350/350',
  },
  {
    productId: '4',
    productName: '오카야마 4일',
    productPrice: '999000',
    productThumbnail: 'https://picsum.photos/id/40/350/350',
  },
  {
    productId: '5',
    productName: '광저우 5일',
    productPrice: '729000',
    productThumbnail: 'https://picsum.photos/id/50/350/350',
  },
  {
    productId: '6',
    productName: '미서부 9일 (모두투어)',
    productPrice: '1890000',
    productThumbnail: 'https://picsum.photos/id/60/350/350',
  },
  {
    productId: '7',
    productName: '사이판 월드 리조트 5일 (모두투어)',
    productPrice: '1269000',
    productThumbnail: 'https://picsum.photos/id/70/350/350',
  },
  {
    productId: '8',
    productName: '까미노 성지순례 11일',
    productPrice: '2290000',
    productThumbnail: 'https://picsum.photos/id/80/350/350',
  },
  {
    productId: '9',
    productName: '호주 시드니 8일',
    productPrice: '2699000',
    productThumbnail: 'https://picsum.photos/id/10/350/350',
  },
  {
    productId: '10',
    productName: '다낭 골프팩 3박 5일',
    productPrice: '1000000',
    productThumbnail: 'https://picsum.photos/id/20/350/350',
  },
  {
    productId: '11',
    productName: '나고야 골프팩 4일',
    productPrice: '1863000',
    productThumbnail: 'https://picsum.photos/id/30/350/350',
  },
  {
    productId: '12',
    productName: '오카야마 4일',
    productPrice: '999000',
    productThumbnail: 'https://picsum.photos/id/40/350/350',
  },
  {
    productId: '13',
    productName: '광저우 5일',
    productPrice: '729000',
    productThumbnail: 'https://picsum.photos/id/50/350/350',
  },
  {
    productId: '14',
    productName: '미서부 9일 (모두투어)',
    productPrice: '1890000',
    productThumbnail: 'https://picsum.photos/id/60/350/350',
  },
  {
    productId: '15',
    productName: '사이판 월드 리조트 5일 (모두투어)',
    productPrice: '1269000',
    productThumbnail: 'https://picsum.photos/id/70/350/350',
  },
  {
    productId: '16',
    productName: '까미노 성지순례 11일',
    productPrice: '2290000',
    productThumbnail: 'https://picsum.photos/id/80/350/350',
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
        <Select size="small" defaultValue={'최신순'}>
          <MenuItem value={'최신순'}>최신순</MenuItem>
          <MenuItem value={'가격 오름차 순'}>가격 오름차 순</MenuItem>
          <MenuItem value={'가격 내림차 순'}>가격 내림차 순</MenuItem>
        </Select>
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
  color: ${COLORS.primary};
`;
