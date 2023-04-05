import { getAdminProductCategory } from '@/apis/admin/category';
import Image from '@/components/common/Image';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { ICategory, IProductDetail } from '@/interfaces/product';
import styled from '@emotion/styled';
import { Table, TableRow, TableCell, Button, TextField, Select, MenuItem } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
const Editor = dynamic(() => import('@/components/common/Editor'), { ssr: false });

const ProductEditForm = () => {
  const router = useRouter();
  const [product, setProduct] = useState<IProductDetail>();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [imagePreview, setImagePreview] = useState('');
  const [editValue, setEditValue] = useState<string>('');
  const { register, handleSubmit, watch } = useForm();
  const thumbnail = watch('thumbnail');
  const { ref } = register('thumbnail');
  const thumbnailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (thumbnail && thumbnail.length > 0) {
      const file = thumbnail[0];
      setImagePreview(URL.createObjectURL(file));
      console.log(imagePreview);
    }
  }, [thumbnail]);

  // const formData = {
  // productId: '',
  // name: '',
  // summary: '',
  // price: 0,
  // area: '',
  // feature: '',
  // airplane: '',
  // singleRoomPrice: 0,
  // type: '',
  // thumbnail: '',
  // detail: '',
  // productStatus: '',
  // categories: [],
  // productOptions: [],
  // };

  const onSubmit = async () => {
    //  await editProduct({
    //     ...data
    // })
  };

  useEffect(() => {
    setProduct(JSON.parse(router.query.data as string));
    (async () => {
      const data = await getAdminProductCategory();
      setCategory(data.content);
    })();
  }, []);

  const handleThumbnail = () => {
    thumbnailRef.current!.click();
  };

  return (
    <Container>
      <PageTitle title="상품 수정" fontSize="20px" padding="10px" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <TableRow>
            <TableCell align="center" width="200px">
              썸네일
            </TableCell>
            <TableCell align="left" component="th">
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
              ></TextField>
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
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">카테고리</TableCell>
            <TableCell align="left">
              <Select
                size="small"
                fullWidth
                {...register('category')}
                // onChange={(event) => setCategory(event.target.value)}
              >
                {category &&
                  category.map((item, idx) => (
                    <MenuItem key={idx} value={item.categoryId}>
                      {item.categoryName}
                    </MenuItem>
                  ))}
              </Select>
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
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">특징</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.feature}
                {...(register('feature'), require)}
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">항공</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.airplane}
                {...register('airplane')}
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">요약정보</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.summary}
                {...register('summary')}
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">싱글룸가격</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.singleRoomPrice}
                {...register('singleRoomPrice')}
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품상태</TableCell>
            <TableCell align="left">
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.productStatus}
                {...register('productStatus')}
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품옵션</TableCell>
            <TableCell align="left">
              {/* {product && product.productOptions.map((item) => <p>{item.startDate}</p>)} */}
              <Button variant="contained" onClick={handleThumbnail}>
                추가
              </Button>
              <TextField
                size="small"
                fullWidth
                defaultValue={product && product.productStatus}
                {...register('productStatus')}
              ></TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상세정보</TableCell>
            <TableCell align="left">
              {/* <Controller
                name="DraftJS"
                render={({ value, onChange }) => <Editor editorState={value} onChange={onChange} />}
              /> */}
              <EditorContent>
                <Editor htmlStr={editValue} setHtmlStr={setEditValue} {...register('detail')} />
              </EditorContent>
              {/* <TextField
                size="small"
                fullWidth
                defaultValue={product && product.detail}
                {...register('detail')}
              ></TextField> */}
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

const EditorContent = styled.div`
  height: 500px;
  .rdw-editor-wrapper {
    height: 90%;
  }
`;

const File = styled.input`
  display: none;
`;
