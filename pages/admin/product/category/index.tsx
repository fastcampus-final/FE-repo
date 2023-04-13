import {
  getAdminProductCategory,
  postAdminProductCategory,
  patchAdminProductCategory,
  deleteAdminProductCategory,
} from '@/apis/admin/category';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  Collapse,
  FormControl,
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
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';

const ProductCategory = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [selectCategory, setSelectCategory] = useState({ 1: 0, 2: 0 });
  const [data, setData] = useState<ICategory>({
    categoryId: 0,
    categoryParent: 0,
    categoryName: '',
    categoryDepth: 1,
  });

  useEffect(() => {
    (async () => {
      try {
        const data: ICategory[] = await getAdminProductCategory();
        setCategory(data);
      } catch {
        return dispatch(
          setModal({
            isOpen: true,
            onClickOk: () => dispatch(setModal({ isOpen: false })),
            text: MESSAGES.CATEGORY.ERROR_GET_CATEGORY,
          }),
        );
      }
    })();
  }, []);

  const handleAddCategory = async () => {
    try {
      const formData =
        selectCategory[2] > 0
          ? {
              categoryParent: selectCategory[2],
              categoryName: data.categoryName,
              categoryDepth: 3,
            }
          : selectCategory[1] > 0
          ? {
              categoryParent: selectCategory[1],
              categoryName: data.categoryName,
              categoryDepth: 2,
            }
          : {
              categoryParent: 0,
              categoryName: data.categoryName,
              categoryDepth: 1,
            };
      await postAdminProductCategory(formData);
      const category: ICategory[] = await getAdminProductCategory();
      setCategory(category);
      setSelectCategory({ 1: 0, 2: 0 });
      setData({
        categoryId: 0,
        categoryParent: 0,
        categoryName: '',
        categoryDepth: 1,
      });
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.CATEGORY.COMPLETE_ADD,
        }),
      );
    } catch {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.CATEGORY.ERROR_ADD,
        }),
      );
    }
  };

  const handleEditCategory = async () => {
    try {
      await patchAdminProductCategory(data.categoryId!, { categoryName: data.categoryName });
      const category: ICategory[] = await getAdminProductCategory();
      setCategory(category);
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.CATEGORY.COMPLETE_EDIT,
        }),
      );
    } catch {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.CATEGORY.ERROR_EDIT,
        }),
      );
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteAdminProductCategory(data.categoryId!);
      const category: ICategory[] = await getAdminProductCategory();
      setCategory(category);
      setSelectCategory({ 1: 0, 2: 0 });
      setData({
        categoryId: 0,
        categoryParent: 0,
        categoryName: '',
        categoryDepth: 1,
      });
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.CATEGORY.COMPLETE_DELETE,
        }),
      );
    } catch (error: any) {
      if (error!.response!.status === 406) {
        return dispatch(
          setModal({
            isOpen: true,
            onClickOk: () => dispatch(setModal({ isOpen: false })),
            text: MESSAGES.CATEGORY.ERROR_DELETE_PARENT,
          }),
        );
      } else {
        return dispatch(
          setModal({
            isOpen: true,
            onClickOk: () => dispatch(setModal({ isOpen: false })),
            text: MESSAGES.CATEGORY.ERROR_DELETE,
          }),
        );
      }
    }
  };

  return (
    <Container>
      <PageTitle title="상품 카테고리 관리" fontSize="20px" padding="10px" />
      <TableWrap>
        <List sx={{ width: '30%', height: '70vh', overflow: 'auto' }}>
          {category && category.length > 0 ? (
            category.map((item1, idx) => (
              <div key={idx}>
                <ListItemButton
                  key={idx}
                  onClick={() =>
                    setData({
                      categoryId: item1.categoryId,
                      categoryParent: 0,
                      categoryName: item1.categoryName,
                      categoryDepth: item1.categoryDepth,
                    })
                  }
                >
                  <ListItemIcon>
                    <FmdGoodIcon />
                  </ListItemIcon>
                  <ListItemText primary={item1.categoryName} />
                </ListItemButton>
                {item1.children?.map((item2, idx) => (
                  <Collapse key={idx} in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        sx={{ pl: 6 }}
                        key={idx}
                        onClick={() =>
                          setData({
                            categoryId: item2.categoryId,
                            categoryParent: 0,
                            categoryName: item2.categoryName,
                            categoryDepth: item2.categoryDepth,
                          })
                        }
                      >
                        <ListItemIcon>
                          <FmdGoodIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={item2.categoryName} />
                      </ListItemButton>
                      {item2.children?.map((item3, idx) => (
                        <Collapse key={idx} in={true} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton
                              sx={{ pl: 10 }}
                              key={idx}
                              onClick={() =>
                                setData({
                                  categoryId: item3.categoryId,
                                  categoryParent: 0,
                                  categoryName: item3.categoryName,
                                  categoryDepth: item3.categoryDepth,
                                })
                              }
                            >
                              <ListItemIcon>
                                <FmdGoodIcon color="secondary" />
                              </ListItemIcon>
                              <ListItemText primary={item3.categoryName} />
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
        <Form>
          <Table>
            {data.categoryId === 0 && (
              <TableRow>
                <TableCell align="center">카테고리</TableCell>
                <TableCell align="left">
                  <CategoryWrap>
                    <SelectWrap>
                      <FormControl size="small" fullWidth>
                        <InputLabel>대분류</InputLabel>
                        <Select
                          label="대분류"
                          value={selectCategory[1]}
                          onChange={(event) =>
                            setSelectCategory((prev) => ({
                              ...prev,
                              1: Number(event.target.value),
                            }))
                          }
                        >
                          {category &&
                            category.map((item, idx) => (
                              <MenuItem key={idx} value={item.categoryId}>
                                {item.categoryName}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <FormControl size="small" fullWidth>
                        <InputLabel>중분류</InputLabel>
                        <Select
                          label="중분류"
                          value={selectCategory[2]}
                          onChange={(event) =>
                            setSelectCategory((prev) => ({
                              ...prev,
                              2: Number(event.target.value),
                            }))
                          }
                        >
                          {category &&
                            category
                              .filter((value) => value.categoryId === selectCategory['1'])
                              .map((item1, idx) =>
                                item1.children!.map((item2) => (
                                  <MenuItem key={idx} value={item2.categoryId}>
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
            )}
            <TableRow>
              <TableCell align="center">카테고리명</TableCell>
              <TableCell align="left">
                <TextField
                  size="small"
                  fullWidth
                  value={data.categoryName}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, categoryName: event.target.value }))
                  }
                />
              </TableCell>
            </TableRow>
          </Table>
          <ButtonWrap>
            <Button variant="outlined" onClick={handleDeleteCategory}>
              삭제
            </Button>
            <FlexWrap>
              <Button
                variant="outlined"
                type="submit"
                onClick={() =>
                  setData({
                    categoryId: 0,
                    categoryParent: 0,
                    categoryName: '',
                    categoryDepth: 1,
                  })
                }
              >
                신규 등록
              </Button>
              {data.categoryId === 0 ? (
                <Button variant="contained" type="submit" onClick={handleAddCategory}>
                  등록 완료
                </Button>
              ) : (
                <Button variant="contained" type="submit" onClick={handleEditCategory}>
                  수정 완료
                </Button>
              )}
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
  gap: 30px;
`;

const Form = styled.div`
  width: 70%;
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
