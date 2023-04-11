import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Table, TableRow, TableCell, Button } from '@mui/material';
import { ROUTES } from '@/constants/routes';
import { IRecommend } from '@/interfaces/product';
import Image from '@/components/common/Image';
import {
  deleteAdminRecommendProduct,
  getAdminRecommendProductDetail,
} from '@/apis/admin/recommend';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';

const RecommendProductDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<IRecommend>();

  useEffect(() => {
    (async () => {
      try {
        const data = await getAdminRecommendProductDetail(Number(router.query.id));
        setProduct(data);
      } catch {
        return dispatch(
          setModal({
            isOpen: true,
            onClickOk: () => dispatch(setModal({ isOpen: false })),
            text: MESSAGES.PRODUCT_DETAIL.ERROR_GET_DETAIL,
          }),
        );
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteAdminRecommendProduct(id);
      router.push(ROUTES.ADMIN.RECOMMEND);
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.PRODUCT.COMPLETE_DELETE_PRODUCT,
        }),
      );
    } catch {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.PRODUCT.ERROR_DELETE_PRODUCT,
        }),
      );
    }
  };

  return (
    <Container>
      <PageTitle title="추천 상품 상세" fontSize="20px" padding="10px" />
      <form>
        <Table>
          <TableRow>
            <TableCell align="center">이미지</TableCell>
            <TableCell align="left" colSpan={3}>
              <Image src={product?.image} alt={product?.regionName} width="700px" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" width="15%">
              상품명
            </TableCell>
            <TableCell align="left" width="30%">
              {product?.regionName}
            </TableCell>
            <TableCell align="center">우선순위</TableCell>
            <TableCell align="left">{product?.rate}</TableCell>
          </TableRow>
        </Table>
        <ButtonWrap>
          <Button variant="outlined" onClick={() => handleDelete(product!.regionId!)}>
            삭제
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              router.push(
                { pathname: ROUTES.ADMIN.RECOMMEND_EDIT, query: { id: product!.regionId! } },
                ROUTES.ADMIN.RECOMMEND_EDIT,
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

export default withAuth(RecommendProductDetail);

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

const EmptyText = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ChipWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
