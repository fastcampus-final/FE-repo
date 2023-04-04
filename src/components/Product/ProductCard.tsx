import { ROUTES } from '@/constants/routes';
import { IProduct } from '@/interfaces/product';
import { formatPrice } from '@/utils/format';
import { useRouter } from 'next/router';
import React from 'react';
import styled from '@emotion/styled';
import Image from '../common/Image';

interface Props {
  data: IProduct;
}

const ProductCard = ({ data }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.PRODUCT_BY_ID(data.productId));
  };

  return (
    <Container onClick={handleClick}>
      <ProductImg src={data.productThumbnail} alt={data.productName} />
      <Title> {data.productName}</Title>
      <Price>{formatPrice(data.productPrice)}</Price>
    </Container>
  );
};

export default ProductCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 10px;
  width: 386px;
  @media (max-width: 1200px) {
    width: 43vw;
  }
`;

const ProductImg = styled.img`
  width: 386px;
  height: 386px;
  border-radius: 10px;
  @media (max-width: 1200px) {
    width: 43vw;
    height: 43vw;
  }
`;

const Title = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 334px;
  @media (max-width: 1200px) {
    font-size: 1.1rem;
    width: 43vw;
  }
`;

const Price = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  @media (max-width: 1200px) {
    font-size: 1.1rem;
  }
`;
