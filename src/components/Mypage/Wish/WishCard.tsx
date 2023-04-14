import Image from '@/components/common/Image';
import { ROUTES } from '@/constants/routes';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IWish } from '@/interfaces/wish';
import { deleteMyWish } from '@/apis/mypage/wish';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';
import { deleteWishState } from '@/store/wish';

interface Props {
  data: IWish;
}

const WishCard = ({ data }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    router.push(ROUTES.PRODUCT_BY_ID(data.productId));
  };

  const handleDeleteWish = async (id: number) => {
    try {
      await deleteMyWish(id);
      dispatch(deleteWishState(id));

      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.MYPAGE.WISH.COMPLETE_DELETE,
        }),
      );
    } catch {
      return dispatch(
        setModal({
          isOpen: true,
          text: MESSAGES.MYPAGE.WISH.ERROR_DELETE_WISH,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
        }),
      );
    }
  };

  return (
    <Container>
      <WishButton onClick={() => handleDeleteWish(data.wishlistId)}>
        <FavoriteIcon color="secondary" />
      </WishButton>
      <Image
        src={data.productThumbnail}
        alt={data.productName}
        width="100%"
        height="20vw"
        mediaHeight="180px"
        borderRadius="10px"
        isCover={true}
      />
      <Title onClick={handleClick}>{data.productName}</Title>
    </Container>
  );
};

export default WishCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  @media (max-width: 1200px) {
    font-size: 14px;
    width: 43vw;
  }
`;

const WishButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
  &:hover {
    scale: 1.3;
  }
`;
