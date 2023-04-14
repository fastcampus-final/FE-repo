import { ROUTES } from '@/constants/routes';
import { ICart } from '@/interfaces/cart';
import { formatPeriod, formatPrice } from '@/utils/format';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from '../common/Image';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styled from '@emotion/styled';
import { Button, Checkbox, Divider, InputLabel, MenuItem, Select } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { deleteCart, patchCartOption } from '@/apis/cart';
import { deleteCartState, editCartState } from '@/store/cart';
import { useDispatch } from 'react-redux';
import { MESSAGES } from '@/constants/messages';
import { setModal } from '@/store/modal';

interface Props {
  data: ICart;
  setTotalAmount: any;
  handleCheck: any;
  checkId: number[];
  setCheckId: any;
}

const CartItem = ({ data, setTotalAmount, handleCheck, checkId, setCheckId }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [dateOptionId, setDateOptionId] = useState(data.option.productOptionId);
  const [peopleCount, setPeopleCount] = useState(data.numberOfPeople);
  const [singleRoomCount, setSingleRoomCount] = useState(data.singleRoomNumber);
  const [peopleAmount, setPeopleAmount] = useState(peopleCount * data.productPrice);
  const [singleRoomAmount, setSingleRoomAmount] = useState(singleRoomCount * data.singleRoomPrice);

  useEffect(() => {
    setTotalAmount((prev: number) => prev + peopleAmount + singleRoomAmount);
  }, []);

  useEffect(() => {
    setPeopleAmount(peopleCount * data.productPrice);
  }, [peopleCount]);

  useEffect(() => {
    setSingleRoomAmount(singleRoomCount * data.singleRoomPrice);
  }, [singleRoomCount]);

  useEffect(() => {
    setAmount(peopleAmount + singleRoomAmount);
  }, [peopleAmount, singleRoomAmount]);

  const handleClick = () => {
    router.push(ROUTES.PRODUCT_BY_ID(data.productId));
  };

  const handleDeleteCart = async (id: number) => {
    try {
      await deleteCart([id]);
      dispatch(deleteCartState(id));
      setTotalAmount((prev: number) => prev - amount);
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.CART.COMPLETE_DELETE,
        }),
      );
    } catch {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.CART.ERROR_DELETE,
        }),
      );
    }
  };

  const handleEditCart = async () => {
    try {
      await patchCartOption(data.cartId, {
        numberOfPeople: peopleCount,
        singleRoomNumber: singleRoomCount,
        productOptionId: dateOptionId,
      });
      dispatch(
        editCartState({
          cartId: data.cartId,
          numberOfPeople: peopleCount,
          singleRoomNumber: singleRoomCount,
          productOptionId: dateOptionId,
        }),
      );
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.CART.COMPLETE_EDIT,
        }),
      );
    } catch {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.CART.ERROR_EDIT,
        }),
      );
    }
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

  const handlePeoplePlus = () => {
    setPeopleCount((prev) => prev + 1);
    setTotalAmount((prev: number) => prev + data.productPrice);
  };

  const handlePeopleMinus = () => {
    if (peopleCount === 1) {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.CART.CHECK_PEOPLE,
        }),
      );
    } else {
      setPeopleCount((prev) => prev - 1);
      setTotalAmount((prev: number) => prev - data.productPrice);
    }
  };

  const handleSingleRoomPlus = () => {
    setSingleRoomCount((prev) => prev + 1);
    setTotalAmount((prev: number) => prev + data.singleRoomPrice);
  };

  const handleSingleRoomMinus = () => {
    if (singleRoomCount > 0) {
      setSingleRoomCount((prev) => prev - 1);
      setTotalAmount((prev: number) => prev - data.singleRoomPrice);
    }
  };

  return (
    <Container>
      <CheckboxWrap>
        <Checkbox
          aria-label="checkbox"
          sx={{ width: '10px', height: '10px' }}
          checked={checkId!.includes(data.cartId) ? true : false}
          onChange={(e) => handleCheck!(e.target.checked, data.cartId)}
        />
        <HighlightOffOutlinedIcon
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={() => handleDeleteCart(data.cartId)}
        />
      </CheckboxWrap>
      <ProductWrap>
        <Image
          src={data.productThumbnail}
          alt={data.productName}
          width="150px"
          height="150px"
          borderRadius="10px"
          onClick={handleClick}
          cursorPointer={true}
        />
        <ProductText>
          <Title onClick={handleClick}> {data.productName}</Title>
          <Price>{formatPrice(amount)}</Price>
        </ProductText>
      </ProductWrap>
      <Divider />
      <OptionWrap>
        <Option>
          <InputLabel id="select-date">출발일자 / 도착일자</InputLabel>
          <Select
            labelId="select-date"
            size="small"
            value={dateOptionId}
            sx={{ backgroundColor: 'white' }}
            onChange={(event) => setDateOptionId(Number(event.target.value))}
          >
            {data.productOptions.length > 0 &&
              data.productOptions.map((item, idx) => (
                <MenuItem
                  key={idx}
                  value={item.productOptionId}
                  selected={item.productOptionId === dateOptionId}
                >
                  {formatPeriod(item.startDate, item.endDate)}
                </MenuItem>
              ))}
          </Select>
        </Option>
        <Count>
          <FlexWrap>
            <InputLabel id="product-count" sx={{ width: '50px' }}>
              인원
            </InputLabel>
            <RemoveCircleIcon cursor="pointer" color="primary" onClick={handlePeopleMinus} />
            {peopleCount}
            <AddCircleIcon cursor="pointer" color="primary" onClick={handlePeoplePlus} />
          </FlexWrap>
          <p>{formatPrice(peopleAmount)}</p>
        </Count>
        <Count>
          <FlexWrap>
            <InputLabel id="product-count" sx={{ width: '50px' }}>
              싱글룸
            </InputLabel>
            <RemoveCircleIcon cursor="pointer" color="primary" onClick={handleSingleRoomMinus} />
            {singleRoomCount}
            <AddCircleIcon cursor="pointer" color="primary" onClick={handleSingleRoomPlus} />
          </FlexWrap>
          <p>{formatPrice(singleRoomAmount)}</p>
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
  align-items: center;
`;

const ProductWrap = styled.div`
  display: flex;
  gap: 20px;
  padding-bottom: 10px;
`;

const ProductText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 150px;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  line-height: 1.6;
  @media (max-width: 1200px) {
    font-size: 16px;
  }
`;

const OptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 10px;
  width: 100%;
  padding: 10px 0;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
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
  height: 40px;
`;

const Price = styled.p`
  display: flex;
  flex-direction: row-reverse;
  font-weight: 600;
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
