import { ROUTES } from '@/constants/routes';
import { ICart } from '@/interfaces/cart';
import { formatPeriod, formatPrice } from '@/utils/format';
import { useRouter } from 'next/router';
import React from 'react';
import Image from '../common/Image';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styled from '@emotion/styled';
import { Checkbox, InputLabel, MenuItem, Select } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

interface Props {
  data: ICart;
}

const CartItem = ({ data }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.PRODUCT_BY_ID(data.productId));
  };

  return (
    <Container>
      <CheckboxWrap>
        <Checkbox aria-label="checkbox" />
        <HighlightOffOutlinedIcon color="primary" />
      </CheckboxWrap>
      <ProductWrap>
        <Image
          src={data.productThumbnail}
          alt={data.productName}
          width="120px"
          height="120px"
          borderRadius="10px"
          onClick={handleClick}
          cursorPointer={true}
        />
        <ProductText>
          <Title onClick={handleClick}> {data.productName}</Title>
          <Price>{formatPrice(data.productPrice)}</Price>
        </ProductText>
      </ProductWrap>
      <OptionWrap>
        <Option>
          <InputLabel id="select-date">출발일자</InputLabel>
          <Select
            labelId="select-date"
            size="small"
            value={data.travelDate && formatPeriod(data.travelDate)}
          >
            <MenuItem value={data.travelDate && formatPeriod(data.travelDate)}>
              {data.travelDate && formatPeriod(data.travelDate)}
            </MenuItem>
          </Select>
        </Option>
        <Count>
          <InputLabel id="product-count">인원 수</InputLabel>
          <RemoveCircleIcon cursor="pointer" color="primary" />
          {data.reservationNumber}
          <AddCircleIcon cursor="pointer" color="primary" />
        </Count>
      </OptionWrap>
    </Container>
  );
};

export default CartItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
`;

const CheckboxWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductWrap = styled.div`
  display: flex;
  gap: 20px;
`;

const ProductText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 120px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const OptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Count = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  padding: 8px;
`;

const Price = styled.p`
  display: flex;
  justify-content: end;
  align-items: center;
`;
