import { getAdminProductCategory } from '@/apis/admin/category';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { useRouter } from 'next/router';
import React, { MouseEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AdminTableHead from '@/components/common/AdminTableHead';
import { Button, Pagination, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { ROUTES } from '@/constants/routes';
import { ICategory } from '@/interfaces/product';

const ProductCategory = () => {
  const router = useRouter();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    (async () => {
      const data: ICategory[] = await getAdminProductCategory(1);
      setCategory(data);
    })();
  }, []);

  const handlePagination = async (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setPage(Number(target.outerText));
    const data = await getAdminProductCategory(Number(target.outerText));
    setCategory(data.content);
  };

  return (
    <Container>
      <PageTitle title="상품 카테고리 관리" fontSize="20px" padding="10px" />
      <TableWrap>
        <Table>
          <AdminTableHead titles={['번호', '카테고리명', '카테고리 깊이']} />
          <TableBody>
            {category && category.length > 0 ? (
              category.map((item, idx) => (
                <TableRow
                  key={idx}
                  style={{ cursor: 'pointer' }}
                  hover
                  onClick={() => router.push(ROUTES.ADMIN.PRODUCT_BY_ID(String(item.categoryId)))}
                >
                  <TableCell align="center" width="200px">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="center">{item.categoryName}</TableCell>
                  <TableCell align="center" width="400px">
                    {item.categoryDepth}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <EmptyText>등록된 상품 카테고리가 없습니다.</EmptyText>
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

export default withAuth(ProductCategory);

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
