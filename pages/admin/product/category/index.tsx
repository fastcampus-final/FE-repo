import { getAdminProductCategory } from '@/apis/admin/category';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { useRouter } from 'next/router';
import React, { MouseEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import { ICategory } from '@/interfaces/product';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useForm } from 'react-hook-form';

const ProductCategory = () => {
  const router = useRouter();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectCategory, setSelectCategory] = useState({ 1: 0, 2: 0, 3: 0 });
  const { register, handleSubmit, watch } = useForm<ICategory>();

  useEffect(() => {
    (async () => {
      const data: ICategory[] = await getAdminProductCategory();
      setCategory(data);
    })();
  }, []);

  const handlePagination = async (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setPage(Number(target.outerText));
    const data = await getAdminProductCategory();
    setCategory(data.content);
  };

  const onSubmit = async () => {
    // const thumbnail = await uploadImage(data.thumbnail[0], 'product');
    // let formData = {
    //   airplane: data.airplane,
    //   area: data.area,
    //   categoryIdList: categoryChip.map((item) => item.categoryId),
    //   detail,
    //   feature: data.feature,
    //   name: data.name,
    //   price: data.price,
    //   productStatus: data.productStatus,
    //   singleRoomPrice: data.singleRoomPrice,
    //   summary: data.summary,
    //   thumbnail,
    //   options: productOption.map((item) => ({
    //     startDate: item.startDate,
    //     endDate: item.endDate,
    //     maxPeople: item.maxPeople,
    //     maxSingleRoom: item.maxSingleRoom,
    //   })),
    // };
    // if (data.type) formData = Object.assign(formData, { type: data.type });
    // await addAdminProduct(formData);
    // router.push(ROUTES.ADMIN.PRODUCT);
  };

  return (
    <Container>
      <PageTitle title="상품 카테고리 관리" fontSize="20px" padding="10px" />
      <TableWrap>
        <List sx={{ width: '40%', height: '70vh', overflow: 'auto' }}>
          {category && category.length > 0 ? (
            category.map((item1, idx) => (
              <div key={idx}>
                <ListItemButton key={idx}>
                  <ListItemIcon>
                    <FmdGoodIcon />
                  </ListItemIcon>
                  <ListItemText primary={item1.categoryName} />
                  {/* <IconWrap>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="primary"
                      sx={{ cursor: 'pointer' }}
                    >
                      <AddCircleIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="primary"
                      sx={{ cursor: 'pointer' }}
                    >
                      <ModeEditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" sx={{ cursor: 'pointer' }}>
                      <DeleteIcon />
                    </IconButton>
                  </IconWrap> */}
                </ListItemButton>
                {item1.children?.map((item2, idx) => (
                  <Collapse key={idx} in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 6 }}>
                        <ListItemIcon>
                          <FmdGoodIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={item2.categoryName} />
                        {/* <IconWrap>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            color="primary"
                            sx={{ cursor: 'pointer' }}
                          >
                            <AddCircleIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            color="primary"
                            sx={{ cursor: 'pointer' }}
                          >
                            <ModeEditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete" sx={{ cursor: 'pointer' }}>
                            <DeleteIcon />
                          </IconButton>
                        </IconWrap> */}
                      </ListItemButton>
                      {item2.children?.map((item3, idx) => (
                        <Collapse key={idx} in={true} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 10 }}>
                              <ListItemIcon>
                                <FmdGoodIcon color="secondary" />
                              </ListItemIcon>
                              <ListItemText primary={item3.categoryName} />
                              {/* <IconWrap>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  color="primary"
                                  sx={{ cursor: 'pointer' }}
                                >
                                  <AddCircleIcon />
                                </IconButton>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  color="primary"
                                  sx={{ cursor: 'pointer' }}
                                >
                                  <ModeEditIcon />
                                </IconButton>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  sx={{ cursor: 'pointer' }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </IconWrap> */}
                            </ListItemButton>
                          </List>
                        </Collapse>
                      ))}
                    </List>
                  </Collapse>
                ))}
              </div>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                <EmptyText>등록된 상품 카테고리가 없습니다.</EmptyText>
              </TableCell>
            </TableRow>
          )}
        </List>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <TableRow>
              <TableCell align="center">카테고리</TableCell>
              <TableCell align="left">
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
                              // onClick={() => item.children!.length < 1 && handleAddCategory(item)}
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
                                  // onClick={() =>
                                  //   item2.children!.length < 1 && handleAddCategory(item2)
                                  // }
                                >
                                  {item2.categoryName}
                                </MenuItem>
                              )),
                            )}
                      </Select>
                    </FormControl>
                  </SelectWrap>
                </CategoryWrap>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">카테고리명</TableCell>
              <TableCell align="left">
                <TextField size="small" fullWidth {...register('categoryName')} />
              </TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell align="center">깊이</TableCell>
              <TableCell align="left">
                <TextField type="number" size="small" fullWidth {...register('categoryDepth')} />
              </TableCell>
            </TableRow> */}
          </Table>
          <ButtonWrap>
            <Button variant="outlined" color="secondary">
              삭제
            </Button>
            <FlexWrap>
              <Button variant="outlined" type="submit">
                신규 등록
              </Button>
              <Button variant="contained" type="submit">
                수정 완료
              </Button>
            </FlexWrap>
          </ButtonWrap>
        </Form>
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
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  /* align-items: center; */
  gap: 30px;
`;

// const ButtonWrap = styled.div`
//   width: 100%;
//   box-sizing: border-box;
//   height: 40px;
//   position: relative;
// `;

// const CenterWrap = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

// const RightWrap = styled.div`
//   position: absolute;
//   top: 0;
//   right: 0;
// `;

const Form = styled.div`
  width: 60%;
`;

const EmptyText = styled.p`
  width: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
`;

const IconWrap = styled.div`
  display: flex;
  gap: 20px;
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

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const FlexWrap = styled.div`
  display: flex;
  gap: 10px;
`;
