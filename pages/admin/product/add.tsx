import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { IProduct } from '@/interfaces/product';
import styled from '@emotion/styled';
import { Table, TableRow, TableCell, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const ProductAddForm = () => {
  const router = useRouter();

  return (
    <Container>
      <PageTitle title="상품 등록" fontSize="20px" padding="10px" />
      <form>
        <Table>
          <TableRow>
            <TableCell align="center">썸네일</TableCell>
            <TableCell align="center" component="th">
              <input type={'file'} required />
            </TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품명</TableCell>
            <TableCell align="center">
              <TextField id="outlined-basic" size="small" fullWidth required />
            </TableCell>
            <TableCell align="center">가격</TableCell>
            <TableCell align="center">
              <TextField id="outlined-basic" size="small" fullWidth required />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">요약정보</TableCell>
            <TableCell align="center">
              <TextField id="outlined-basic" size="small" fullWidth required />
            </TableCell>
            <TableCell align="center">예약정보</TableCell>
            <TableCell align="center">
              <TextField id="outlined-basic" size="small" fullWidth required />
            </TableCell>
          </TableRow>
        </Table>
        <ButtonWrap>
          <Button variant="outlined" onClick={() => router.back()}>
            취소
          </Button>
          <Button variant="contained" type="submit">
            등록 완료
          </Button>
        </ButtonWrap>
      </form>
    </Container>
  );
};

export default withAuth(ProductAddForm);

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
