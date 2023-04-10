import { ROUTES } from '@/constants/routes';
import { ICart } from '@/interfaces/cart';
import { formatPeriod, formatPrice } from '@/utils/format';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from '../common/Image';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styled from '@emotion/styled';
import { Button, Checkbox, Divider, InputLabel, MenuItem, Select } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

interface Props {
  data: ICart;
}

const CartItem = ({ data }: Props) => {
  const router = useRouter();
  const [peopleCount, setPeopleCount] = useState(data.numberOfPeople);
  const [singleRoomCount, setSingleRoomCount] = useState(data.singleRoomNumber);
  const [peopleAmount, setPeopleAmount] = useState(
    formatPrice(data.numberOfPeople * data.productPrice),
  );
  const [singleRoomAmount, setSingleRoomAmount] = useState(
    formatPrice(data.singleRoomNumber * data.singleRoomPrice),
  );

  const handleClick = () => {
    router.push(ROUTES.PRODUCT_BY_ID(data.productId));
  };

  const handleDeleteCart = () => {
    //
  };

  const handleEditCart = () => {
    //
  };

  const handleOrder = () => {
    router.push(
      {
        pathname: ROUTES.ORDER,
        query: {
          amount: data.productPrice,
          items: JSON.stringify([data]),
        },
      },
      '/order',
    );
  };

  return (
    <Container>
      <CheckboxWrap>
        <Checkbox aria-label="checkbox" />
        <HighlightOffOutlinedIcon color="primary" onClick={handleDeleteCart} />
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
      <Divider sx={{ padding: '10px 0' }} />
      <OptionWrap>
        <Option>
          <InputLabel id="select-date">출발일자 / 도착일자</InputLabel>
          <Select
            labelId="select-date"
            size="small"
            value={data.option.productOptionId}
            sx={{ backgroundColor: 'white' }}
          >
            {data.productOptions.length > 0 &&
              data.productOptions.map((item, idx) => (
                <MenuItem
                  key={idx}
                  value={item.productOptionId}
                  selected={item.productOptionId === data.option.productOptionId}
                >
                  {formatPeriod(item.startDate, item.endDate)}
                </MenuItem>
              ))}
          </Select>
        </Option>
        <Count>
          <FlexWrap>
            <InputLabel id="product-count">인원</InputLabel>
            <RemoveCircleIcon cursor="pointer" color="primary" />
            {peopleCount}
            <AddCircleIcon cursor="pointer" color="primary" />
          </FlexWrap>
          <p>{peopleAmount}</p>
        </Count>
        <Count>
          <FlexWrap>
            <InputLabel id="product-count">싱글룸</InputLabel>
            <RemoveCircleIcon cursor="pointer" color="primary" />
            {singleRoomCount}
            <AddCircleIcon cursor="pointer" color="primary" />
          </FlexWrap>
          <p>{singleRoomAmount}</p>
        </Count>
      </OptionWrap>
      <ButtonWrap>
        <Button
          variant="outlined"
          onClick={handleEditCart}
          sx={{ backgroundColor: 'white' }}
          fullWidth
        >
          변경 저장
        </Button>
        <Button variant="contained" onClick={handleOrder} fullWidth>
          바로 예약
        </Button>
      </ButtonWrap>
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
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const OptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 20px;
  width: 100%;
  padding-bottom: 20px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

const Count = styled.p`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Price = styled.p`
  display: flex;
  flex-direction: row-reverse;
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;
