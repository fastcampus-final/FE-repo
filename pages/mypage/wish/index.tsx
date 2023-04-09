import { getMyWishList } from '@/apis/mypage/wish';
import PageTitle from '@/components/common/PageTitle';
import MyPageNavbar from '@/components/layout/MyPageNavbar';
import WishCard from '@/components/Mypage/Wish/WishCard';
import { IWishList } from '@/interfaces/wishlist';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

const MyWish = () => {
  const [product, setProduct] = useState<IWishList[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getMyWishList();
      setProduct(data);
    })();
  }, []);

  return (
    <Container>
      {/* <NavbarWrap> */}
      <MyPageNavbar />
      {/* </NavbarWrap> */}
      <MypageWrap>
        <PageTitle title="나의 관심 상품" />
        <CardContainer>
          {product && product.map((item) => <WishCard key={item.productId} data={item} />)}
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

const NavbarWrap = styled.div`
  @media (max-width: 1200px) {
    /* display: none; */
  }
`;
