import React from 'react';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';
import PageTitle from '@/components/common/PageTitle';
import AdminTableHead from '@/components/common/AdminTableHead';
import AdminTableBody from '@/components/common/AdminTableBody';
import { IProduct } from '@/interfaces/product';
import { Button, Pagination, Table } from '@mui/material';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';

const data: IProduct[] = [
  {
    productId: '1',
    productName: '오사카 패키지 여행',
    productPrice: '2680000',
    productThumbnail: '/',
  },
  {
    productId: '2',
    productName: '캐나다 패키지 여행',
    productPrice: '6270000',
    productThumbnail: '/',
  },
  {
    productId: '3',
    productName: '오사카 패키지 여행',
    productPrice: '2680000',
    productThumbnail: '/',
  },
  {
    productId: '4',
    productName: '캐나다 패키지 여행',
    productPrice: '6270000',
    productThumbnail: '/',
  },
  {
    productId: '5',
    productName: '오사카 패키지 여행',
    productPrice: '2680000',
    productThumbnail: '/',
  },
  {
    productId: '6',
    productName: '캐나다 패키지 여행',
    productPrice: '6270000',
    productThumbnail: '/',
  },
  {
    productId: '7',
    productName: '오사카 패키지 여행',
    productPrice: '2680000',
    productThumbnail: '/',
  },
  {
    productId: '8',
    productName: '캐나다 패키지 여행',
    productPrice: '6270000',
    productThumbnail: '/',
  },
  {
    productId: '9',
    productName: '오사카 패키지 여행',
    productPrice: '2680000',
    productThumbnail: '/',
  },
  {
    productId: '10',
    productName: '캐나다 패키지 여행',
    productPrice: '6270000',
    productThumbnail: '/',
  },
];

const Product = () => {
  const router = useRouter();

  return (
    <Container>
      <PageTitle title="상품 관리" fontSize="20px" padding="10px" />
      <TableWrap>
        <Table>
          <AdminTableHead titles={['번호', '제목', '가격']} />
          <AdminTableBody data={data} />
        </Table>
        <ButtonWrap>
          <Button variant="outlined">삭제</Button>
          <Pagination count={5} color="primary" />
          <Button variant="contained" onClick={() => router.push(ROUTES.ADMIN.PRODUCT_FORM)}>
            등록
          </Button>
        </ButtonWrap>
      </TableWrap>
    </Container>
  );
};

export default withAuth(Product);

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const TableWrap = styled.div`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
