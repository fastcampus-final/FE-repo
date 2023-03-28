import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import { Table, TableRow, TableCell } from '@material-ui/core';
import { Button, TextField } from '@mui/material';
import { ROUTES } from '@/constants/routes';

const ProductDetail = () => {
  const router = useRouter();

  const data = {
    productId: '1',
    productName: '오사카 패키지 여행',
    productPrice: '2680000',
    productThumbnail: '/',
  };

  return (
    <Container>
      <PageTitle title="상품 상세" fontSize="20px" padding="10px" />
      <form>
        <Table>
          <TableRow>
            <TableCell align="center">썸네일</TableCell>
            <TableCell align="center" component="th">
              {data.productThumbnail}
            </TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품명</TableCell>
            <TableCell align="center">{data.productName}</TableCell>
            <TableCell align="center">가격</TableCell>
            <TableCell align="center">{data.productPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">요약정보</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">예약정보</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </Table>
        <ButtonWrap>
          <Button variant="outlined">삭제</Button>
          <Button variant="contained" onClick={() => router.push(ROUTES.ADMIN.PRODUCT_FORM)}>
            수정
          </Button>
        </ButtonWrap>
      </form>
    </Container>
  );
};

export default withAuth(ProductDetail);

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
