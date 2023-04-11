import { deleteAdminBanner, getAdminBannerDetail } from '@/apis/admin/banner';
import Image from '@/components/common/Image';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { IBanner } from '@/interfaces/banner';
import { setModal } from '@/store/modal';
import styled from '@emotion/styled';
import { Table, TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const BannerDetail = () => {
  const router = useRouter();
  const [detail, setDetail] = useState<IBanner>();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const bannerId = window.location.pathname.slice(14);
      const data = await getAdminBannerDetail(Number(router.query.id) | Number(bannerId));
      setDetail(data);
    })();
  }, []);

  const deleteHandler = () => {
    return dispatch(
      setModal({
        isOpen: true,
        onClickOk: async () => {
          const deleteData = await deleteAdminBanner(Number(detail?.bannerId));
          if (deleteData === 'ERR_BAD_REQUEST') {
            return dispatch(
              setModal({
                isOpen: true,
                onClickOk: () => dispatch(setModal({ isOpen: false })),
                text: MESSAGES.COMMUNITY.ERROR_DELETE,
              }),
            );
          } else {
            return dispatch(
              setModal({
                isOpen: true,
                onClickOk: () => {
                  dispatch(setModal({ isOpen: false }));
                  router.push(ROUTES.REVIEW);
                },
                text: MESSAGES.COMMUNITY.COMPLETE_DELETE,
              }),
            );
          }
        },
        onClickCancel: () => dispatch(setModal({ isOpen: false })),
        text: MESSAGES.COMMUNITY.CONFIRM_DELETE,
      }),
    );
  };
  return (
    <Container>
      <PageTitle title="후기 상세 정보" fontSize="20px" padding="10px" />
      <DetailContent>
        <Table>
          <TableRow>
            <TableCell align="center">썸네일</TableCell>
            <TableCell align="left" colSpan={3}>
              <Image src={detail && detail.image} alt="banner" width="330px" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" width="15%">
              번호
            </TableCell>
            <TableCell align="left" width="30%">
              {detail && detail.bannerId}
            </TableCell>
            <TableCell align="center">관련 상품</TableCell>
            <TableCell align="left">{router.query.product && router.query.product}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" width="15%">
              제목
            </TableCell>
            <TableCell align="left" width="30%">
              {detail && detail.title}
            </TableCell>
            <TableCell align="center">소제목</TableCell>
            <TableCell align="left">{detail && detail.subtitle}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">태그</TableCell>
            <TableCell align="left" colSpan={3}>
              {detail && detail.tag}
            </TableCell>
          </TableRow>
        </Table>
        <ButtonContent>
          <button
            className="white"
            onClick={() =>
              router.push(
                {
                  pathname: ROUTES.ADMIN.BANNER_EDIT,
                  query: {
                    id: detail?.bannerId,
                  },
                },
                ROUTES.ADMIN.BANNER_EDIT,
              )
            }
          >
            수정
          </button>
          <button className="blue" onClick={() => deleteHandler()}>
            삭제
          </button>
        </ButtonContent>
      </DetailContent>
    </Container>
  );
};

export default withAuth(BannerDetail);

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

const DetailContent = styled.div`
  margin-top: 2rem;
`;

const ButtonContent = styled.div`
  margin-bottom: 5px;
  margin-top: 20px;
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
