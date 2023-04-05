import { getAdminRecommendProduct } from '@/apis/admin/recommend';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Pagination, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { ROUTES } from '@/constants/routes';
import AdminTableHead from '@/components/common/AdminTableHead';
import { IRecommend } from '@/interfaces/product';

const RecommendProduct = () => {
  const router = useRouter();
  const [recomment, setRecommend] = useState<IRecommend[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAdminRecommendProduct();
      setRecommend(data.content);
    })();
  }, []);

  return (
    <Container>
      <PageTitle title="추천 상품 관리" />
      <TableWrap>
        <Table>
          <AdminTableHead titles={['번호', '상품명', '노출단계']} />
          <TableBody>
            {recomment &&
              recomment.length > 0 &&
              recomment.map((item, idx) => (
                <TableRow
                  key={idx}
                  style={{ cursor: 'pointer' }}
                  hover
                  onClick={() => router.push(ROUTES.ADMIN.PRODUCT_BY_ID(String(item.regionId)))}
                >
                  <TableCell align="center" width="200px">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="center">{item.regionName}</TableCell>
                  <TableCell align="center">{item.rate}</TableCell>
                </TableRow>
              ))}
          </TableBody>
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
