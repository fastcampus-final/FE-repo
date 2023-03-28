import { ROUTES } from '@/constants/routes';
import { ICart } from '@/interfaces/cart';
import { formatPeriod, formatPrice } from '@/utils/format';
import { useRouter } from 'next/router';
import React from 'react';
import Image from '../common/Image';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styled from '@emotion/styled';
import { Divider, MenuItem, Select } from '@mui/material';

interface Props {
  data: ICart;
}

const CartItem = ({ data }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.PRODUCT_BY_ID(data.productId));
  };

  return (
    <>
      <Container>
        <Image
          src={data.productThumbnail}
          alt={data.productName}
          width="120px"
          height="120px"
          borderRadius="10px"
          onClick={handleClick}
          cursorPointer={true}
        />
        <Info>
          <Title onClick={handleClick}> {data.productName}</Title>
          <Select size="small" value={data.travelDate && formatPeriod(data.travelDate)}>
            <MenuItem value={data.travelDate && formatPeriod(data.travelDate)}>
              {data.travelDate && formatPeriod(data.travelDate)}
            </MenuItem>
          </Select>
        </Info>
        <Count>
          <RemoveCircleIcon cursor="pointer" color="primary" />
          {data.reservationNumber}
          <AddCircleIcon cursor="pointer" color="primary" />
        </Count>
        <Price>{formatPrice(data.productPrice)}</Price>
      </Container>
      <Divider />
    </>
  );
};

export default CartItem;

const Container = styled.div`
  display: flex;
  gap: 30px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const Count = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Price = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;
