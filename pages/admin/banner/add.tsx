import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

import ArrowLeft from '@/../public/icons/arrow-left.svg';
import { useRouter } from 'next/router';
import PageTitle from '@/components/common/PageTitle';
import { Button, Table, TableCell, TableRow, TextField } from '@mui/material';
import { uploadImage } from '@/apis/common';
import Select from 'react-select';
import { getAdminProduct } from '@/apis/admin/product';
import { IProduct } from '@/interfaces/product';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';
import { postAdminBanner } from '@/apis/admin/banner';
import { ROUTES } from '@/constants/routes';
import { useForm } from 'react-hook-form';
import { IBannerForm } from '@/interfaces/banner';

const BannerAddForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<IBannerForm>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const [option, setOption] = useState<Array<IProduct>>([]);
  const [items, setItems] = useState<{
    label: string;
    value: number;
  }>();

  useEffect(() => {
    (async () => {
      const data = await getAdminProduct();
      setOption(data.content);
    })();
  }, []);

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const res = await uploadImage(file as unknown as string, 'review');
      setFileUrl(res);
    };

    setFileName(e.target.files[0]?.name);
  };

  const onUploadImageButtonClick = async () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileUrl);
    setFileUrl('');
    setFileName('');
  };

  const optionSelect = (option: any) => {
    const label = option?.label as string;
    const value = option?.value as number;

    const optionData = {
      label,
      value,
    };

    setItems(optionData);
  };

  const onSubmit = async (data: IBannerForm) => {
    const formData = {
      image: fileUrl,
      productId: items?.value,
      subtitle: data.subtitle,
      tag: data.tag,
      title: data.title,
    };
    const addData = await postAdminBanner(formData);
    if (addData === 'ERR_BAD_REQUEST') {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => {
            dispatch(setModal({ isOpen: false }));
          },
          text: MESSAGES.COMMUNITY.ERROR_DELETE,
        }),
      );
    } else {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => {
            dispatch(setModal({ isOpen: false }));
            router.push(ROUTES.ADMIN.BANNER);
          },
          text: MESSAGES.COMMUNITY.COMPLETE_ADD,
        }),
      );
    }
  };

  return (
    <AddContent>
      <BackRouter onClick={() => router.back()}>
        <ArrowLeft />
        <PageTitle title="배너 관리" />
      </BackRouter>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <TableRow>
            <TableCell align="center">배너 이미지</TableCell>
            <TableCell align="left" colSpan={1}>
              <TitleImage>
                <Button onClick={onUploadImageButtonClick}>이미지 선택</Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  style={{ display: 'none' }}
                  onChange={onUploadImage}
                />
                {fileName}
                {fileName !== '' ? <Button onClick={() => deleteFileImage()}>지우기</Button> : null}
              </TitleImage>
            </TableCell>
            <TableCell align="center">관련 상품</TableCell>
            <TableCell align="left">
              <Select
                onChange={optionSelect}
                options={
                  option &&
                  option.map((item) => {
                    return {
                      label: item.productName,
                      value: item.productId,
                    };
                  })
                }
                placeholder="상품을 선택해 주세요"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">제목</TableCell>
            <TableCell align="left">
              <TextField size="small" fullWidth type="string" {...register('title')} />
            </TableCell>
            <TableCell align="center">소제목</TableCell>
            <TableCell align="left">
              <TextField type="string" size="small" fullWidth {...register('subtitle')} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">태그</TableCell>
            <TableCell align="left" colSpan={3}>
              <TextField size="small" fullWidth type="string" {...register('tag')} />
            </TableCell>
          </TableRow>
        </Table>
        <ButtonContent>
          <button className="white" onClick={() => router.back()}>
            취소
          </button>
          <button className="blue" type="submit">
            저장
          </button>
        </ButtonContent>
      </form>
    </AddContent>
  );
};

export default withAuth(BannerAddForm);

const AddContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

const BackRouter = styled.div`
  display: flex;
  margin-bottom: 50px;
  svg {
    width: 30px;
    margin-right: 10px;
  }
  h1 {
    margin: auto 0;
    padding: 0;
  }
`;

const TitleImage = styled.div``;

const ButtonContent = styled.div`
  margin-bottom: 30px;
  margin-top: 80px;
  text-align: right;
  button {
    border-radius: 8px;
    margin: auto;
    width: 5rem;
    height: 2rem;
    font-weight: 600;
    border: 1px solid #0cb1f3;
  }
  .white {
    color: #0cb1f3;
    background-color: #fff;
    margin-right: 10px;
  }
  .blue {
    color: #fff;
    background-color: #0cb1f3;
  }
`;
