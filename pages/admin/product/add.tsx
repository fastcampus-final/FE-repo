import { getAdminProductCategory } from '@/apis/admin/category';
import { addAdminProduct } from '@/apis/admin/product';
import { uploadImage } from '@/apis/common';
import Image from '@/components/common/Image';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { ROUTES } from '@/constants/routes';
import { ICategory, IProductDetailForm, IProductOption } from '@/interfaces/product';
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
  Chip,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
const Editor = dynamic(() => import('@/components/common/Editor'), { ssr: false });

const ProductAddForm = () => {
  const router = useRouter();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [selectCategory, setSelectCategory] = useState({ 1: 0, 2: 0, 3: 0 });
  const [categoryChip, setCategoryChip] = useState<ICategory[]>([]);
  const [productOption, setProductOption] = useState<IProductOption[]>([
    { productOptionId: 0, startDate: '', endDate: '', maxPeople: 0, maxSingleRoom: 0 },
  ]);
  const [imagePreview, setImagePreview] = useState('');
  const [detail, setDetail] = useState<string>('');
  const { register, handleSubmit, watch } = useForm<IProductDetailForm>();
  const { ref } = register('thumbnail');
  const thumbnailWatch = watch('thumbnail');
  const thumbnailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getAdminProductCategory();
      setCategory(data);
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
      categoryIdList: categoryChip.map((item) => item.categoryId),
      detail,
      feature: data.feature,
      name: data.name,
      price: data.price,
      productStatus: data.productStatus,
      singleRoomPrice: data.singleRoomPrice,
      summary: data.summary,
      thumbnail,
      type: data.type,
      options: productOption.map((item) => ({
        startDate: item.startDate,
        endDate: item.endDate,
        maxPeople: item.maxPeople,
        maxSingleRoom: item.maxSingleRoom,
      })),
    };
    await addAdminProduct(formData);
    router.push(ROUTES.ADMIN.PRODUCT);
  };

  const handleThumbnail = () => {
    thumbnailRef.current!.click();
  };

  const handleAddCategory = (item: ICategory) => {
    if (categoryChip.indexOf(item) < 0) {
      setCategoryChip((prev) => prev.concat(item));
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    setCategoryChip((prev) => prev.filter((item) => item.categoryId !== categoryId));
  };

  const handleAddOption = () => {
    setProductOption((prev) =>
      prev.concat({
        productOptionId: prev[prev.length - 1].productOptionId! + 1,
        startDate: '',
        endDate: '',
        maxPeople: 0,
        maxSingleRoom: 0,
      }),
    );
  };

  const handleDeleteOption = (productOptionId: number) => {
    console.log(productOptionId);
    console.log(productOption);
    setProductOption((prev) => prev.filter((item) => item.productOptionId !== productOptionId));
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
            <TableCell align="center">카테고리</TableCell>
            <TableCell align="left" width="500px" colSpan={3}>
              <CategoryWrap>
                <SelectWrap>
                  <FormControl size="small" fullWidth>
                    <InputLabel>대분류</InputLabel>
                    <Select
                      label="대분류"
                      defaultValue={''}
                      onChange={(event) =>
                        setSelectCategory((prev) => ({ ...prev, 1: Number(event.target.value) }))
                      }
                    >
                      {category &&
                        category.map((item, idx) => (
                          <MenuItem
                            key={idx}
                            value={item.categoryId}
                            onClick={() => handleAddCategory(item)}
                          >
                            {item.categoryName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small" fullWidth>
                    <InputLabel>중분류</InputLabel>
                    <Select
                      label="중분류"
                      defaultValue={''}
                      onChange={(event) =>
                        setSelectCategory((prev) => ({ ...prev, 2: Number(event.target.value) }))
                      }
                    >
                      {category &&
                        category
                          .filter((value) => value.categoryId === selectCategory['1'])
                          .map((item1, idx) =>
                            item1.children!.map((item2) => (
                              <MenuItem
                                key={idx}
                                value={item2.categoryId}
                                onClick={() => handleAddCategory(item2)}
                              >
                                {item2.categoryName}
                              </MenuItem>
                            )),
                          )}
                    </Select>
                  </FormControl>
                  <FormControl size="small" fullWidth>
                    <InputLabel>소분류</InputLabel>
                    <Select
                      label="소분류"
                      defaultValue={''}
                      onChange={(event) => {
                        setSelectCategory((prev) => ({ ...prev, 3: Number(event.target.value) }));
                      }}
                    >
                      {category &&
                        category
                          .filter((value) => value.categoryId === selectCategory['1'])
                          .map((item1, idx) =>
                            item1
                              .children!.filter((value) => value.categoryId === selectCategory['2'])
                              .map((item2) =>
                                item2.children!.map((item3) => (
                                  <MenuItem
                                    key={idx}
                                    value={item3.categoryId}
                                    onClick={() => handleAddCategory(item3)}
                                  >
                                    {item3.categoryName}
                                  </MenuItem>
                                )),
                              ),
                          )}
                    </Select>
                  </FormControl>
                </SelectWrap>
                {categoryChip.length > 0 && (
                  <ChipWrap>
                    {categoryChip.map((item, idx) => (
                      <Chip
                        key={idx}
                        label={item.categoryName}
                        onDelete={() => handleDeleteCategory(item.categoryId)}
                      />
                    ))}
                  </ChipWrap>
                )}
              </CategoryWrap>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품명</TableCell>
            <TableCell align="left">
              <TextField size="small" fullWidth {...register('name')} />
            </TableCell>
            <TableCell align="center">상품상태</TableCell>
            <TableCell align="left">
              <FormControl size="small" fullWidth>
                <InputLabel id="category">상품상태</InputLabel>
                <Select
                  {...register('productStatus')}
                  labelId="category"
                  label="상품상태"
                  defaultValue={''}
                >
                  <MenuItem value={'FOR_SALE'}>판매중</MenuItem>
                  <MenuItem value={'STOP_SELLING'}>판매중지</MenuItem>
                  <MenuItem value={'HIDING'}>숨김</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">가격</TableCell>
            <TableCell align="left">
              <TextField size="small" fullWidth type="number" {...register('price')} />
            </TableCell>
            <TableCell align="center">싱글룸가격</TableCell>
            <TableCell align="left">
              <TextField type="number" size="small" fullWidth {...register('singleRoomPrice')} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">지역</TableCell>
            <TableCell align="left">
              <TextField size="small" fullWidth {...register('area')} />
            </TableCell>
            <TableCell align="center">항공</TableCell>
            <TableCell align="left">
              <TextField size="small" fullWidth {...register('airplane')} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">특징</TableCell>
            <TableCell align="left">
              <TextField size="small" fullWidth {...register('feature')} />
            </TableCell>
            <TableCell align="center">추천타입</TableCell>
            <TableCell align="left">
              <FormControl size="small" fullWidth>
                <InputLabel id="category">추천타입</InputLabel>
                <Select {...register('type')} labelId="category" label="추천타입" defaultValue={''}>
                  <MenuItem value={'A'}>ESFJ / INFJ / INFP</MenuItem>
                  <MenuItem value={'B'}>ENTP / INTJ</MenuItem>
                  <MenuItem value={'C'}>ESTJ / ISTP</MenuItem>
                  <MenuItem value={'D'}>ESFP / ESTP / INTP / ISFP</MenuItem>
                  <MenuItem value={'E'}>ENFJ / ENTJ</MenuItem>
                  <MenuItem value={'F'}>ENFP / ISFJ / ISTJ</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">요약정보</TableCell>
            <TableCell align="left" colSpan={3}>
              <TextField size="small" fullWidth {...register('summary')} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품옵션</TableCell>
            <TableCell align="left" colSpan={3}>
              <Table>
                {productOption.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell align="left">
                      <TextField
                        label="출발일자"
                        size="small"
                        fullWidth
                        value={item.startDate}
                        placeholder="YYYY-MM-DD"
                        onChange={(event) =>
                          setProductOption((prev) =>
                            prev.map((prevItem) =>
                              prevItem.productOptionId === item.productOptionId
                                ? { ...prevItem, startDate: event.target.value }
                                : prevItem,
                            ),
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        label="도착일자"
                        size="small"
                        fullWidth
                        value={item.endDate}
                        placeholder="YYYY-MM-DD"
                        onChange={(event) =>
                          setProductOption((prev) =>
                            prev.map((prevItem) =>
                              prevItem.productOptionId === item.productOptionId
                                ? { ...prevItem, endDate: event.target.value }
                                : prevItem,
                            ),
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        label="최대인원"
                        size="small"
                        fullWidth
                        type="number"
                        value={item.maxPeople}
                        onChange={(event) =>
                          setProductOption((prev) =>
                            prev.map((prevItem) =>
                              prevItem.productOptionId === item.productOptionId
                                ? { ...prevItem, maxPeople: Number(event.target.value) }
                                : prevItem,
                            ),
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        label="최대싱글룸"
                        size="small"
                        fullWidth
                        type="number"
                        value={item.maxSingleRoom}
                        onChange={(event) =>
                          setProductOption((prev) =>
                            prev.map((prevItem) =>
                              prevItem.productOptionId === item.productOptionId
                                ? { ...prevItem, maxSingleRoom: Number(event.target.value) }
                                : prevItem,
                            ),
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      {idx === 0 ? (
                        <Button variant="contained" onClick={() => handleAddOption()}>
                          추가
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() => handleDeleteOption(item.productOptionId!)}
                        >
                          삭제
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
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
            등록 완료
          </Button>
        </ButtonWrap>
      </form>
    </Container>
  );
};

export default withAuth(ProductAddForm);

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

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SelectWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const ChipWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const OptionWrap = styled.div`
  display: flex;
  align-items: center;
`;
