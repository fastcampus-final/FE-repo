import { getAdminProductDetail } from '@/apis/admin/product';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { ROUTES } from '@/constants/routes';
import { IProductDetail } from '@/interfaces/product';
import styled from '@emotion/styled';
import { Table, TableRow, TableCell, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ProductEditForm = () => {
  const router = useRouter();
  const [product, setProduct] = useState<IProductDetail>();

  useEffect(() => {
    setProduct(JSON.parse(router.query.data as string));
  }, []);

  const handleSubmit = () => {
    //
  };

  return (
    <Container>
      <PageTitle title="상품 등록" fontSize="20px" padding="10px" />
      <form>
        <Table>
          <TableRow>
            <TableCell align="center">썸네일</TableCell>
            <TableCell align="left" component="th">
              <input type="file" src={product && product.thumbnail} width="330px" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품명</TableCell>
            <TableCell align="left">
              <TextField size="small" fullWidth defaultValue={product && product.name}></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">가격</TableCell>
            <TableCell align="left">
              <TextField size="small" fullWidth defaultValue={product && product.price}></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">카테고리</TableCell>
            <TableCell align="left">
              {/* {product && product.categories.map((item) => <p>{item.categoryName}</p>)} */}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">지역</TableCell>
            <TableCell align="left">
              <TextField size="small" fullWidth defaultValue={product && product.area}></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">특징</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.feature}
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">항공</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.airplane}
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">요약정보</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.summary}
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">싱글룸가격</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.singleRoomPrice}
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품상태</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.productStatus}
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품옵션</TableCell>
            <TableCell align="left">
              {/* {product && product.productOptions.map((item) => <p>{item.startDate}</p>)} */}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상세정보</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.detail}
              ></TextField>
            </TableCell>
          </TableRow>
        </Table>
        <ButtonWrap>
          <Button variant="outlined" onClick={() => router.back()}>
            취소
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            수정 완료
          </Button>
        </ButtonWrap>
      </form>
    </Container>
  );
};

export default withAuth(ProductEditForm);

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
