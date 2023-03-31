import ProductCard from '@/components/Product/ProductCard';
import { IProduct } from '@/interfaces/product';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { instance } from '../../src/api/instance';
import { COLORS } from '@/styles/colors';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import RefreshIcon from '@mui/icons-material/Refresh';

const tempData: IProduct[] = [
  {
    productId: '1',
    productName: '호주 시드니 8일',
    productPrice: '2699000',
    productThumbnail: 'https://picsum.photos/id/10/350/350',
  },
  {
    productId: '2',
    productName: '다낭 골프팩 3박 5일',
    productPrice: '1000000',
    productThumbnail: 'https://picsum.photos/id/20/350/350',
  },
  {
    productId: '3',
    productName: '나고야 골프팩 4일',
    productPrice: '1863000',
    productThumbnail: 'https://picsum.photos/id/30/350/350',
  },
  {
    productId: '4',
    productName: '오카야마 4일',
    productPrice: '999000',
    productThumbnail: 'https://picsum.photos/id/40/350/350',
  },
  {
    productId: '5',
    productName: '광저우 5일',
    productPrice: '729000',
    productThumbnail: 'https://picsum.photos/id/50/350/350',
  },
  {
    productId: '6',
    productName: '미서부 9일 (모두투어)',
    productPrice: '1890000',
    productThumbnail: 'https://picsum.photos/id/60/350/350',
  },
  {
    productId: '7',
    productName: '사이판 월드 리조트 5일 (모두투어)',
    productPrice: '1269000',
    productThumbnail: 'https://picsum.photos/id/70/350/350',
  },
  {
    productId: '8',
    productName: '까미노 성지순례 11일',
    productPrice: '2290000',
    productThumbnail: 'https://picsum.photos/id/80/350/350',
  },
  {
    productId: '9',
    productName: '호주 시드니 8일',
    productPrice: '2699000',
    productThumbnail: 'https://picsum.photos/id/10/350/350',
  },
  {
    productId: '10',
    productName: '다낭 골프팩 3박 5일',
    productPrice: '1000000',
    productThumbnail: 'https://picsum.photos/id/20/350/350',
  },
  {
    productId: '11',
    productName: '나고야 골프팩 4일',
    productPrice: '1863000',
    productThumbnail: 'https://picsum.photos/id/30/350/350',
  },
  {
    productId: '12',
    productName: '오카야마 4일',
    productPrice: '999000',
    productThumbnail: 'https://picsum.photos/id/40/350/350',
  },
  {
    productId: '13',
    productName: '광저우 5일',
    productPrice: '729000',
    productThumbnail: 'https://picsum.photos/id/50/350/350',
  },
  {
    productId: '14',
    productName: '미서부 9일 (모두투어)',
    productPrice: '1890000',
    productThumbnail: 'https://picsum.photos/id/60/350/350',
  },
  {
    productId: '15',
    productName: '사이판 월드 리조트 5일 (모두투어)',
    productPrice: '1269000',
    productThumbnail: 'https://picsum.photos/id/70/350/350',
  },
  {
    productId: '16',
    productName: '까미노 성지순례 11일',
    productPrice: '2290000',
    productThumbnail: 'https://picsum.photos/id/80/350/350',
  },
];

const getData = async () => {
  const { data } = await instance.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

interface Props {
  type?: string;
}

const Product = ({ type }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [peopleCount, setPeopleCount] = useState('0');
  const [order, setOrder] = useState('recent');

  const data = useQuery({
    queryKey: ['data'],
    queryFn: getData,
  });

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
          {type === 'search' ? '검색 결과' : '총 상품'} <Count>{tempData.length}</Count> 개
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
        {tempData.map((item) => (
          <ProductCard key={item.productId} data={item} />
        ))}
      </ProductWrap>
    </Container>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['data'],
    queryFn: getData,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

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
  @media (max-width: 576px) {
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
  gap: 20px;
  padding-top: 20px;
`;
