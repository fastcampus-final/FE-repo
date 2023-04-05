import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Table, TableRow, TableCell, Button } from '@mui/material';
import { ROUTES } from '@/constants/routes';
import { getAdminProductDetail } from '@/apis/admin/product';
import { IProductDetail } from '@/interfaces/product';
import Image from '@/components/common/Image';
import { formatPrice, formatProductStatus } from '@/utils/format';
import Parser from 'html-react-parser';

const ProductDetail = () => {
  const router = useRouter();
  const [product, setProduct] = useState<IProductDetail>();

  useEffect(() => {
    (async () => {
      const data = await getAdminProductDetail(router.query.id as string);
      setProduct(data);
    })();
  }, []);

  return (
    <Container>
      <PageTitle title="상품 상세" fontSize="20px" padding="10px" />
      <form>
        <Table>
          <TableRow>
            <TableCell align="center" width="200px">
              썸네일
            </TableCell>
            <TableCell align="left" component="th">
              <Image
                src={product && product.thumbnail}
                alt={product && product.name}
                width="330px"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품명</TableCell>
            <TableCell align="left">{product && product.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">가격</TableCell>
            <TableCell align="left">{product && formatPrice(product.price)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">카테고리</TableCell>
            <TableCell align="left">
              {product &&
                product.categories!.length > 0 &&
                product.categories!.map((item, idx) => <p key={idx}>{item.categoryName}</p>)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">지역</TableCell>
            <TableCell align="left">{product && product.area}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">특징</TableCell>
            <TableCell align="left">{product && product.feature}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">항공</TableCell>
            <TableCell align="left">{product && product.airplane}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">요약정보</TableCell>
            <TableCell align="left">{product && product.summary}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">싱글룸가격</TableCell>
            <TableCell align="left">{product && formatPrice(product.singleRoomPrice!)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품상태</TableCell>
            <TableCell align="left">
              {product && formatProductStatus(product.productStatus!)}
            </TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell align="center">여행유형</TableCell>
            <TableCell align="left">{product && product.type}</TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell align="center">상품옵션</TableCell>
            <TableCell align="left">
              {product &&
                product.productOptions!.length > 0 &&
                product.productOptions!.map((item, idx) => (
                  <div key={idx}>
                    <p>출발일자: {item.startDate}</p>
                    <p>도착일자: {item.endDate}</p>
                    <p>최대인원: {item.maxPeople}</p>
                    <p>현재인원: {item.presentSingleRoomNumber}</p>
                    <p>최대싱글룸: {item.maxSingleRoom}</p>
                    <p>현재싱글룸: {item.presentPeopleNumber}</p>
                  </div>
                ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상세정보</TableCell>
            <TableCell align="left">{product && Parser(product.detail)}</TableCell>
          </TableRow>
        </Table>
        <ButtonWrap>
          <Button variant="outlined">삭제</Button>
          <Button
            variant="contained"
            onClick={() =>
              router.push(
                { pathname: ROUTES.ADMIN.PRODUCT_EDIT, query: { data: JSON.stringify(product) } },
                ROUTES.ADMIN.PRODUCT_EDIT,
              )
            }
          >
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
