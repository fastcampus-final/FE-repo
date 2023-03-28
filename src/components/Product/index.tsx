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
        width="330"
        height="330"
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
  margin: 14px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: 600;
`;
