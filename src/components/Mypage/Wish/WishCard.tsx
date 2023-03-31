import Image from '@/components/common/Image';
import { ROUTES } from '@/constants/routes';
import { IProduct } from '@/interfaces/product';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  data: IProduct;
}

const WishCard = ({ data }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.PRODUCT_BY_ID(data.productId));
  };

  return (
    <Container onClick={handleClick}>
      <WishButton>
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
      <Title> {data.productName}</Title>
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
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 334px;
  @media (max-width: 576px) {
    font-size: 1.1rem;
    width: 43vw;
  }
`;

const WishButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
