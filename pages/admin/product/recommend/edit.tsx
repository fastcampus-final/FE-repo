import { getAdminRecommendProductDetail, putAdminRecommendProduct } from '@/apis/admin/recommend';
import { uploadImage } from '@/apis/common';
import Image from '@/components/common/Image';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { IRecommend } from '@/interfaces/product';
import { setModal } from '@/store/modal';
import styled from '@emotion/styled';
import { Table, TableRow, TableCell, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const ProductRecommendEditForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState('');
  const { register, handleSubmit, watch, reset } = useForm<IRecommend>();
  const { ref } = register('image');
  const imageWatch = watch('image');
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [product, setProduct] = useState<IRecommend>();

  useEffect(() => {
    (async () => {
      try {
        const data = await getAdminRecommendProductDetail(Number(router.query.id));
        setProduct(data);
        setImagePreview(data.image);
        reset({
          regionId: data.regionId,
          regionName: data.regionName,
          rate: data.rate,
        });
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

  useEffect(() => {
    if (imageWatch && imageWatch.length > 0) {
      const file = imageWatch[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [imageWatch]);

  const onSubmit = async (data: IRecommend) => {
    try {
      const image =
        data.image.length > 0 ? await uploadImage(data.image[0], 'region') : product?.image;
      const formData = {
        rate: data.rate,
        regionName: data.regionName,
        image,
      };
      await putAdminRecommendProduct(product!.regionId!, formData);
      router.push(ROUTES.ADMIN.RECOMMEND);
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.PRODUCT.COMPLETE_EDIT_PRODUCT,
        }),
      );
    } catch {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.PRODUCT.ERROR_EDIT_PRODUCT,
        }),
      );
    }
  };

  const handleImage = () => {
    imageRef.current!.click();
  };

  return (
    <Container>
      <PageTitle title="추천 상품 수정" fontSize="20px" padding="10px" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <TableRow>
            <TableCell align="center" component="th" width="200px">
              이미지
            </TableCell>
            <TableCell align="left" colSpan={3}>
              <ImageWrap>
                {imagePreview && <Image src={imagePreview} alt="image" width="700px" />}
                <File
                  type="file"
                  {...register('image')}
                  ref={(event) => {
                    ref(event);
                    imageRef.current = event;
                  }}
                />
                <Button variant="contained" onClick={handleImage}>
                  파일 선택
                </Button>
              </ImageWrap>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품명</TableCell>
            <TableCell align="left" width="500px">
              <TextField size="small" fullWidth {...register('regionName')} />
            </TableCell>
            <TableCell align="center" width="200px">
              우선순위
            </TableCell>
            <TableCell align="left" width="500px">
              <TextField size="small" type="number" fullWidth {...register('rate')} />
            </TableCell>
          </TableRow>
        </Table>
        <ButtonWrap>
          <Button variant="outlined" onClick={() => router.back()}>
            취소
          </Button>
          <Button variant="contained" type="submit">
            수정 완료
          </Button>
        </ButtonWrap>
      </form>
    </Container>
  );
};

export default withAuth(ProductRecommendEditForm);

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

const File = styled.input`
  display: none;
`;

const ImageWrap = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;
