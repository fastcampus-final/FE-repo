import { getAdminRecommendProduct } from '@/apis/admin/recommend';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { MouseEvent, useEffect, useState } from 'react';
import { Button, Pagination, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { ROUTES } from '@/constants/routes';
import AdminTableHead from '@/components/common/AdminTableHead';
import { IRecommend } from '@/interfaces/product';

const RecommendProduct = () => {
  const router = useRouter();
  const [recomment, setRecommend] = useState<IRecommend[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    (async () => {
      const data = await getAdminRecommendProduct(1);
      setRecommend(data.content);
    })();
  }, []);

  const handlePagination = async (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setPage(Number(target.outerText));
    const data = await getAdminRecommendProduct(Number(target.outerText));
    setRecommend(data.content);
  };

  return (
    <Container>
      <PageTitle title="추천 상품 관리" fontSize="20px" padding="10px" />
      <TableWrap>
        <Table>
          <AdminTableHead titles={['번호', '상품명', '노출단계']} />
          <TableBody>
            {recomment && recomment.length > 0 ? (
              recomment.map((item, idx) => (
                <TableRow
                  key={idx}
                  style={{ cursor: 'pointer' }}
                  hover
                  onClick={() => router.push(ROUTES.ADMIN.PRODUCT_BY_ID(item.regionId))}
                >
                  <TableCell align="center" width="200px">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="center">{item.regionName}</TableCell>
                  <TableCell align="center">{item.rate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <EmptyText>등록된 추천 상품이 없습니다.</EmptyText>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ButtonWrap>
          <CenterWrap>
            <Pagination count={totalPage} color="primary" onClick={handlePagination} page={page} />
          </CenterWrap>
          <RightWrap>
            <Button variant="contained" onClick={() => router.push(ROUTES.ADMIN.PRODUCT_ADD)}>
              등록
            </Button>
          </RightWrap>
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
  box-sizing: border-box;
  height: 40px;
  position: relative;
`;

const CenterWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RightWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const EmptyText = styled.p`
  width: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
`;
