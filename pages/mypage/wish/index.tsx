import PageTitle from '@/components/common/PageTitle';
import MyPageNavbar from '@/components/layout/MyPageNavbar';
import WishCard from '@/components/Mypage/Wish/WishCard';
import ProductItem from '@/components/Product/ProductCard';
import { IProduct } from '@/interfaces/product';
import styled from '@emotion/styled';
import React from 'react';

const tempData: IProduct[] = [
  {
    productId: '1',
    productName: '호주 시드니 8일',
    productPrice: 2699000,
    productThumbnail: 'https://picsum.photos/id/10/350/350',
  },
  {
    productId: '2',
    productName: '다낭 골프팩 3박 5일',
    productPrice: 1000000,
    productThumbnail: 'https://picsum.photos/id/20/350/350',
  },
  {
    productId: '3',
    productName: '나고야 골프팩 4일',
    productPrice: 1863000,
    productThumbnail: 'https://picsum.photos/id/30/350/350',
  },
  {
    productId: '4',
    productName: '오카야마 4일',
    productPrice: 999000,
    productThumbnail: 'https://picsum.photos/id/40/350/350',
  },
  {
    productId: '5',
    productName: '광저우 5일',
    productPrice: 729000,
    productThumbnail: 'https://picsum.photos/id/50/350/350',
  },
];

const MyWish = () => {
  return (
    <Container>
      <MyPageNavbar />
      <MypageWrap>
        <PageTitle title="나의 관심 상품" />
        <CardContainer>
          {tempData.map((item) => (
            <WishCard key={item.productId} data={item} />
          ))}
        </CardContainer>
      </MypageWrap>
    </Container>
  );
};

export default MyWish;

const Container = styled.div`
  display: flex;
  width: 1200px;
  margin: 0 auto;
  gap: 30px;
  padding: 16px 0;
  @media (max-width: 1200px) {
    padding: 16px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

const MypageWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;
