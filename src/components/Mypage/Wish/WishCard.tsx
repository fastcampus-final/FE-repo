import Image from '@/components/common/Image';
import { ROUTES } from '@/constants/routes';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IWishList } from '@/interfaces/wishlist';
import { deleteMyWish } from '@/apis/mypage/wish';

interface Props {
  data: IWishList;
}

const WishCard = ({ data }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(
      {
        pathname: ROUTES.PRODUCT_BY_ID(data.productId),
        query: {
          id: data.productId,
        },
      },
      ROUTES.PRODUCT_BY_ID(data.productId),
    );
  };

  const handleDeleteWish = async (id: number) => {
    await deleteMyWish({ wishlistId: id });
  };

  return (
    <Container onClick={handleClick}>
      <WishButton onClick={() => handleDeleteWish(data.productId)}>
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
      <Title>{data.productName}</Title>
    </Container>
  );
};

export default WishCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 10px;
  width: 100%;
  position: relative;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 334px;
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
