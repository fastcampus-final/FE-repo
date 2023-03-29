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

const ProductItem = ({ data }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.PRODUCT_BY_ID(data.productId));
  };

  return (
    <Container onClick={handleClick}>
      <Image
        src={data.productThumbnail}
        alt={data.productName}
        width="334px"
        height="334px"
        mediaWidth="43vw"
        mediaHeight="43vw"
        borderRadius="10px"
      />
      <Title> {data.productName}</Title>
      <Price>{formatPrice(data.productPrice)}</Price>
    </Container>
  );
};

export default ProductItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 10px;
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

const Price = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;
