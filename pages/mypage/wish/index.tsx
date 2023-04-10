import { getMyWishList } from '@/apis/mypage/wish';
import PageTitle from '@/components/common/PageTitle';
import MyPageNavbar from '@/components/layout/MyPageNavbar';
import WishCard from '@/components/Mypage/Wish/WishCard';
import { IWishList } from '@/interfaces/wishlist';
import { RootState } from '@/store';
import { setWishState } from '@/store/wish';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MyWish = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<IWishList[]>([]);
  const favorList: IWishList[] = useSelector((state: RootState) => state.wish);

  useEffect(() => {
    (async () => {
      const data = await getMyWishList();
      dispatch(setWishState(data));
    })();
  }, []);

  return (
    <Container>
      <MyPageNavbar />
      <MypageWrap>
        <PageTitle title="나의 관심 상품" />
        <CardContainer>
          {favorList.length > 0 ? (
            favorList.map((item) => <WishCard key={item.productId} data={item} />)
          ) : (
            <p>관심 상품이 없습니다.</p>
          )}
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
