import { getAdminProductCategory } from '@/apis/admin/category';
import { addAdminProduct } from '@/apis/admin/product';
import { uploadImage } from '@/apis/common';
import Image from '@/components/common/Image';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { ROUTES } from '@/constants/routes';
import { ICategory, IProductDetailForm } from '@/interfaces/product';
import styled from '@emotion/styled';
import {
  Table,
  TableRow,
  TableCell,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
const Editor = dynamic(() => import('@/components/common/Editor'), { ssr: false });

const ProductEditForm = () => {
  const router = useRouter();
  const [product, setProduct] = useState<IProductDetailForm>();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [imagePreview, setImagePreview] = useState('');
  const [detail, setDetail] = useState<string>('');
  const { register, handleSubmit, watch } = useForm<IProductDetailForm>();
  const thumbnailWatch = watch('thumbnail');
  const { ref } = register('thumbnail');
  const thumbnailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      const category = await getAdminProductCategory();
      setCategory(category);
      const data = JSON.parse(router.query.data as string);
      setProduct(data);
    })();
  }, []);

  useEffect(() => {
    if (thumbnailWatch && thumbnailWatch.length > 0) {
      const file = thumbnailWatch[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [thumbnailWatch]);

  const onSubmit = async (data: IProductDetailForm) => {
    const thumbnail = await uploadImage(data.thumbnail[0], 'product');
    const formData = {
      airplane: data.airplane,
      area: data.area,
      categoryIdList: [1],
      detail,
      feature: data.feature,
      name: data.name,
      options: [
        {
          endDate: data.endDate,
          startDate: data.startDate,
          maxPeople: data.maxPeople,
          maxSingleRoom: data.maxSingleRoom,
        },
      ],
      price: data.price,
      productStatus: data.productStatus,
      singleRoomPrice: data.singleRoomPrice,
      summary: data.summary,
      thumbnail,
      type: 'A',
    };
    await addAdminProduct(formData);
    router.push(ROUTES.ADMIN.PRODUCT_BY_ID(product?.productId));
  };

  const handleThumbnail = () => {
    thumbnailRef.current!.click();
  };

  return (
    <Container>
      <PageTitle title="상품 수정" fontSize="20px" padding="10px" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <TableRow>
            <TableCell align="center" component="th" width="200px">
              썸네일
            </TableCell>
            <TableCell align="left" colSpan={3}>
              {imagePreview && <Image src={imagePreview} alt="thumbnail" width="330px" />}
              <File
                type="file"
                {...register('thumbnail')}
                ref={(event) => {
                  ref(event);
                  thumbnailRef.current = event;
                }}
              />
              <Button variant="contained" onClick={handleThumbnail}>
                파일 선택
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품명</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.name}
                {...register('name')}
              />
            </TableCell>
            <TableCell align="center">카테고리</TableCell>
            <TableCell align="left">
              <FormControl size="small" fullWidth>
                <InputLabel id="category">카테고리</InputLabel>
                <Select {...register('categories')} labelId="category" label="카테고리">
                  {category &&
                    category.map((item, idx) => (
                      <MenuItem key={idx} value={item.categoryId}>
                        {item.categoryName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">가격</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                type="number"
                defaultValue={product && product.price}
                {...register('price')}
              />
            </TableCell>
            <TableCell align="center">상품상태</TableCell>
            <TableCell align="left">
              <FormControl size="small" fullWidth>
                <InputLabel id="category">상품상태</InputLabel>
                <Select {...register('productStatus')} labelId="category" label="상품상태">
                  <MenuItem value={'FOR_SALE'}>판매중</MenuItem>
                  <MenuItem value={'STOP_SELLING'}>판매중지</MenuItem>
                  <MenuItem value={'HIDING'}>숨김</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">지역</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.area}
                {...register('area')}
              />
            </TableCell>
            <TableCell align="center">항공</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.airplane}
                {...register('airplane')}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">특징</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.feature}
                {...register('feature')}
              />
            </TableCell>
            <TableCell align="center">싱글룸가격</TableCell>
            <TableCell align="left">
              <TextField
                type="number"
                size="small"
                fullWidth
                defaultValue={product && product.singleRoomPrice}
                {...register('singleRoomPrice')}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">요약정보</TableCell>
            <TableCell align="left" colSpan={3}>
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.summary}
                {...register('summary')}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품옵션</TableCell>
            <TableCell align="left" colSpan={3}>
              <Table>
                <TableRow>
                  <TableCell align="center">출발일자</TableCell>
                  <TableCell align="left">
                    <TextField
                      size="small"
                      fullWidth
                      defaultValue={product && product.startDate}
                      {...register('startDate')}
                      placeholder="YYYY-MM-DD"
                    />
                  </TableCell>
                  <TableCell align="center">도착일자</TableCell>
                  <TableCell align="left">
                    <TextField
                      size="small"
                      fullWidth
                      defaultValue={product && product.endDate}
                      {...register('endDate')}
                      placeholder="YYYY-MM-DD"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">최대인원</TableCell>
                  <TableCell align="left">
                    <TextField size="small" fullWidth defaultValue={0} {...register('maxPeople')} />
                  </TableCell>
                  <TableCell align="center">최대싱글룸</TableCell>
                  <TableCell align="left">
                    <TextField
                      size="small"
                      fullWidth
                      defaultValue={0}
                      {...register('maxSingleRoom')}
                    />
                  </TableCell>
                </TableRow>
              </Table>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상세정보</TableCell>
            <TableCell align="left" colSpan={3}>
              <Editor htmlStr={detail} setHtmlStr={setDetail} {...register('detail')} />
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

export default withAuth(ProductEditForm);

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
