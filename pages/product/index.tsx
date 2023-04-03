import ProductCard from '@/components/Product/ProductCard';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/colors';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IBase } from '@/interfaces/base';

interface Props {
  type?: string;
  data?: IBase;
}

const Product = ({ type, data }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [peopleCount, setPeopleCount] = useState('0');
  const [order, setOrder] = useState('recent');

  const CustomInput = (
    props: React.HTMLProps<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>,
  ) => <TextField size="small" {...props} style={{ width: '140px' }} />;

  const handleClickRefresh = () => {
    setStartDate(null);
    setPeopleCount('0');
    setOrder('recent');
  };

  return (
    <Container>
      <Header>
        <ProductCount>
          {type === 'search' ? '검색 결과' : '총 상품'} <Count>{data?.content.length}</Count> 개
        </ProductCount>
        <Options>
          <DatePicker
            locale={ko}
            dateFormat="yyyy.MM.dd (eee)"
            showPopperArrow={false}
            minDate={new Date()}
            selected={startDate || null}
            placeholderText="출발일자 선택"
            customInput={React.createElement(React.forwardRef(CustomInput))}
            onChange={(date) => setStartDate(date)}
          />

          <Select
            size="small"
            value={peopleCount}
            onChange={(event) => setPeopleCount(event.target.value)}
          >
            <MenuItem value={'0'}>인원</MenuItem>
            <MenuItem value={'1'}>1 인</MenuItem>
            <MenuItem value={'2'}>2 인</MenuItem>
            <MenuItem value={'3'}>3 인</MenuItem>
            <MenuItem value={'4'}>4 인</MenuItem>
            <MenuItem value={'5'}>5 인</MenuItem>
            <MenuItem value={'6'}>6 인</MenuItem>
            <MenuItem value={'7'}>7 인</MenuItem>
            <MenuItem value={'8'}>8 인</MenuItem>
            <MenuItem value={'9'}>9 인</MenuItem>
            <MenuItem value={'10'}>10 인</MenuItem>
          </Select>
          <Select size="small" value={order} onChange={(event) => setOrder(event.target.value)}>
            <MenuItem value={'recent'}>최신순</MenuItem>
            <MenuItem value={'priceDesc'}>높은 가격 순</MenuItem>
            <MenuItem value={'priceAsc'}>낮은 가격 순</MenuItem>
          </Select>
          <Button size="small" variant="outlined" onClick={handleClickRefresh}>
            <RefreshIcon />
          </Button>
        </Options>
      </Header>
      <ProductWrap>
        {data?.content.map((item, idx) => (
          <ProductCard key={idx} data={item} />
        ))}
      </ProductWrap>
    </Container>
  );
};

export default Product;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Options = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const ProductCount = styled.span`
  font-size: 1rem;
`;

const Count = styled.span`
  font-weight: 600;
  color: ${COLORS.primary};
`;

const ProductWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding-top: 20px;
`;
