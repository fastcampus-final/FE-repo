import React, { MouseEvent, useEffect, useState } from 'react';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';
import PageTitle from '@/components/common/PageTitle';
import AdminTableHead from '@/components/common/AdminTableHead';
import { Button, Pagination, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';
import { getAdminProduct } from '@/apis/admin/product';
import { IProduct } from '@/interfaces/product';
import { formatPrice, formatProductStatus } from '@/utils/format';

const Product = () => {
  const router = useRouter();
  const [product, setProduct] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    (async () => {
      const data = await getAdminProduct(1);
      setProduct(data.content);
      setTotalPage(data.totalPages);
    })();
  }, []);

  const handlePagination = async (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setPage(Number(target.outerText));
    const data = await getAdminProduct(Number(target.outerText));
    setProduct(data.content);
  };

  return (
    <Container>
      <PageTitle title="상품 관리" fontSize="20px" padding="10px" />
      <TableWrap>
        <Table>
          <AdminTableHead titles={['번호', '제목', '가격', '상품상태']} />
          <TableBody>
            {product && product.length > 0 ? (
              product.map((item, idx) => (
                <TableRow
                  key={idx}
                  style={{ cursor: 'pointer' }}
                  hover
                  onClick={() => router.push(ROUTES.ADMIN.PRODUCT_BY_ID(String(item.productId)))}
                >
                  <TableCell align="center" width="200px">
                    {(page - 1) * 10 + idx + 1}
                  </TableCell>
                  <TableCell align="center">{item.productName}</TableCell>
                  <TableCell align="center">{formatPrice(item.productPrice)}</TableCell>
                  <TableCell align="center">{formatProductStatus(item.productStatus!)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <EmptyText>등록된 상품이 없습니다.</EmptyText>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ButtonWrap>
          {/* <Button variant="outlined">삭제</Button> */}
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
