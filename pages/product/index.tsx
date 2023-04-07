import ProductCard from '@/components/Product/ProductCard';
import React, { MouseEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { COLORS } from '@/styles/colors';
import { Button, MenuItem, Pagination, Select, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IProduct } from '@/interfaces/product';
import { useRouter } from 'next/router';
import { getProduct, getProductByCategory } from '@/apis/product';
import Search from '@/components/Search/Search';
import dayjs from 'dayjs';

const Product = () => {
  const router = useRouter();
  const [product, setProduct] = useState<IProduct[]>([]);
  const [sort, setSort] = useState('recent');
  const [dateOption, setDateOption] = useState<Date | null>(null);
  const [people, setPeople] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [showProduct, setShowProduct] = useState(false);

  useEffect(() => {
    return () => {
      setProduct([]);
    };
  }, []);

  const CustomInput = (
    props: React.HTMLProps<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>,
  ) => <TextField size="small" style={{ width: '140px' }} inputProps={props} />;

  useEffect(() => {
    (async () => {
      let data = [];
      if (router.query.categoryId) {
        data = await getProductByCategory(router.query.categoryId as string, page);
      } else {
        if (keyword) {
          data = await getProduct(
            keyword,
            page,
            sort,
            people,
            dateOption ? dayjs(dateOption).format('YYYY-MM-DD') : '',
          );
        }
        return;
      }
      setProduct(data.content);
      setPage(1);
      setTotalPage(data.totalPages);
      setTotalCount(data.totalElements);
    })();
  }, [router, sort, people, dateOption]);

  const handleClickRefresh = () => {
    setDateOption(null);
    setPeople(0);
    setSort('recent');
  };

  const handlePagination = async (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setPage(Number(target.outerText));
    let data = [];
    if (router.query.categoryId) {
      data = await getProductByCategory(
        router.query.categoryId as string,
        Number(target.outerText),
      );
    } else {
      data = await getProduct(
        keyword,
        Number(target.outerText),
        sort,
        people,
        dateOption ? dayjs(dateOption).format('YYYY-MM-DD') : '',
      );
    }
    setProduct(data.content);
  };

  return (
    <Container>
      {!router.query.categoryId && (
        <Search
          setPage={setPage}
          setTotalPage={setTotalPage}
          setProduct={setProduct}
          keyword={keyword}
          setKeyword={setKeyword}
          setTotalCount={setTotalCount}
          showProduct={showProduct}
          setShowProduct={setShowProduct}
        />
      )}
      {showProduct && (
        <>
          <Header>
            <ProductCount>
              {router.query.categoryId ? '총 상품' : '검색 결과'}
              <Count>{totalCount ? totalCount : 0}</Count> 개
            </ProductCount>
            <Options>
              <DatePicker
                locale={ko}
                dateFormat="yyyy.MM.dd (eee)"
                showPopperArrow={false}
                minDate={new Date()}
                selected={dateOption}
                placeholderText="출발일자 선택"
                customInput={React.createElement(React.forwardRef(CustomInput))}
                onChange={(date) => setDateOption(date)}
              />
              <Select
                size="small"
                value={people}
                onChange={(event) => setPeople(Number(event.target.value))}
                defaultValue={0}
              >
                <MenuItem value={0}>인원</MenuItem>
                <MenuItem value={1}>1 인</MenuItem>
                <MenuItem value={2}>2 인</MenuItem>
                <MenuItem value={3}>3 인</MenuItem>
                <MenuItem value={4}>4 인</MenuItem>
                <MenuItem value={5}>5 인</MenuItem>
                <MenuItem value={6}>6 인</MenuItem>
                <MenuItem value={7}>7 인</MenuItem>
                <MenuItem value={8}>8 인</MenuItem>
                <MenuItem value={9}>9 인</MenuItem>
                <MenuItem value={10}>10 인</MenuItem>
              </Select>
              <Select
                size="small"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                defaultValue={''}
              >
                <MenuItem value={'recent'}>최신순</MenuItem>
                <MenuItem value={'desc'}>높은 가격 순</MenuItem>
                <MenuItem value={'asc'}>낮은 가격 순</MenuItem>
              </Select>
              <Button size="small" variant="outlined" onClick={handleClickRefresh}>
                <RefreshIcon />
              </Button>
            </Options>
          </Header>
          <ProductWrap>
            {product && product.length > 0 ? (
              product.map((item, idx) => <ProductCard key={idx} data={item} />)
            ) : (
              <p>해당하는 상품이 없습니다.</p>
            )}
          </ProductWrap>
          {totalPage > 0 && (
            <CenterWrap>
              <Pagination
                count={totalPage}
                color="primary"
                onClick={handlePagination}
                page={page}
              />{' '}
            </CenterWrap>
          )}
        </>
      )}
    </Container>
  );
};

export default Product;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 0;
  @media (max-width: 1200px) {
    padding: 16px;
  }
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
  padding-left: 6px;
`;

const ProductWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding-top: 20px;
`;

const CenterWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;
