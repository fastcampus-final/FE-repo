import { getMyWishList } from '@/apis/mypage/wish';
import PageTitle from '@/components/common/PageTitle';
import MyPageNavbar from '@/components/layout/MyPageNavbar';
import WishCard from '@/components/Mypage/Wish/WishCard';
import { MESSAGES } from '@/constants/messages';
import { IWish } from '@/interfaces/wish';
import { RootState } from '@/store';
import { setModal } from '@/store/modal';
import { setWishState } from '@/store/wish';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MyWish = () => {
  const dispatch = useDispatch();
  const wish: IWish[] = useSelector((state: RootState) => state.wish);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyWishList();
        dispatch(setWishState(data));
      } catch {
        return dispatch(
          setModal({
            isOpen: true,
            text: MESSAGES.MYPAGE.WISH.ERROR_GET_WISH,
            onClickOk: () => dispatch(setModal({ isOpen: false })),
          }),
        );
      }
    })();
  }, []);

  return (
    <Container>
      <MyPageNavbar />
      <MypageWrap>
        <PageTitle title="나의 관심 상품" />
        <CardContainer>
          {wish.length > 0 ? (
            wish.map((item) => <WishCard key={item.productId} data={item} />)
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
  box-sizing: border-box;
  @media (max-width: 1200px) {
    padding: 16px;
    width: 100%;
  }

  /* @media (max-width: 1200px) {
    flex-direction: column;
    flex-direction: column-reverse;
  }
  @media (max-width: 1200px) {
    padding: 16px;
  } */
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
