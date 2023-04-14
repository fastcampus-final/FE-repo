import { ROUTES } from '@/constants/routes';
import { IProduct } from '@/interfaces/product';
import { formatPrice } from '@/utils/format';
import { useRouter } from 'next/router';
import React from 'react';
import styled from '@emotion/styled';
import { Chip } from '@mui/material';

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
      {data.productSummary![0] === '#' && (
        <ChipContainer>
          {data.productSummary
            ?.split(' ')!
            .slice(0, 4)
            .map((item, idx) => {
              if (item[0] === '#') {
                return <Chip key={idx} label={item} variant="outlined" color="primary" />;
              }
            })}
        </ChipContainer>
      )}
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
  margin-bottom: 10px;
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

const ChipContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 2px;
  flex-wrap: wrap;
`;

const Title = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 386px;
  margin-top: 4px;
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
