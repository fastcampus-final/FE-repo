import { getAdminProductCategory } from '@/apis/admin/category';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AdminTableHead from '@/components/common/AdminTableHead';
import { Button, Pagination, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { ROUTES } from '@/constants/routes';
import { ICategory } from '@/interfaces/product';

const ProductCategory = () => {
  const router = useRouter();
  const [category, setCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    (async () => {
      const data: ICategory[] = await getAdminProductCategory();
      setCategory(data);
    })();
  }, []);

  return (
    <Container>
      <PageTitle title="상품 카테고리 관리" />
      <TableWrap>
        <Table>
          <AdminTableHead titles={['번호', '깊이', '카테고리명']} />
          <TableBody>
            {category &&
              category.length > 0 &&
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
                  <TableCell align="center" width="200px">
                    {item.categoryDepth}
                  </TableCell>
                  <TableCell align="center">{item.categoryName}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <ButtonWrap>
          <Button variant="outlined">삭제</Button>
          <Pagination count={5} color="primary" />
          <Button variant="contained" onClick={() => router.push(ROUTES.ADMIN.CATEGORY_ADD)}>
            등록
          </Button>
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
  display: flex;
  justify-content: space-between;
`;
