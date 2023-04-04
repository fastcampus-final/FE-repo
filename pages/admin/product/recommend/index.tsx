import { getAdminRecommendProduct } from '@/apis/admin/recommend';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AdminTableHead from '@/components/common/AdminTableHead';
import AdminTableBody from '@/components/common/AdminTableBody';
import { Button, Pagination, Table } from '@mui/material';
import { ROUTES } from '@/constants/routes';

const RecommendProduct = () => {
  const router = useRouter();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAdminRecommendProduct();
      setProduct(data.content);
    })();
  }, []);

  return (
    <Container>
      <PageTitle title="추천 상품 관리" />
      <TableWrap>
        <Table>
          <AdminTableHead titles={['번호', '제목', '가격']} />
          <AdminTableBody data={product} />
        </Table>
        <ButtonWrap>
          <Button variant="outlined">삭제</Button>
          <Pagination count={5} color="primary" />
          <Button variant="contained" onClick={() => router.push(ROUTES.ADMIN.RECOMMEND_ADD)}>
            등록
          </Button>
        </ButtonWrap>
      </TableWrap>
    </Container>
  );
};

export default withAuth(RecommendProduct);

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
