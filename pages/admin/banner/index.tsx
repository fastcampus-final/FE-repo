import { getAdminBanner } from '@/apis/admin/banner';
import { getProductDetail } from '@/apis/product';
import BannerList from '@/components/Admin/banner/BannerList';
import AdminTableHead from '@/components/common/AdminTableHead';
import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import { ROUTES } from '@/constants/routes';
import { IBanner } from '@/interfaces/banner';
import styled from '@emotion/styled';
import { Button, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Banner = () => {
  const router = useRouter();
  const [bannerList, setBannerList] = useState<Array<IBanner>>([]);

  useEffect(() => {
    (async () => {
      const banner = await getAdminBanner();
      setBannerList(banner);
    })();
  }, []);

  return (
    <Container>
      <PageTitle title="배너 관리" />
      <TableWrap>
        <Table>
          <AdminTableHead titles={['번호', '관련 상품 명']} />
          <TableBody>
            {bannerList && bannerList.length > 0 ? (
              bannerList.map((item, idx) => <BannerList key={idx} data={item} />)
            ) : (
              <TableRow>
                <TableCell colSpan={2}>
                  <EmptyText>등록된 배너가 없습니다.</EmptyText>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <BottomArea>
          <Button
            className="addBtn"
            variant="outlined"
            onClick={() => router.push(ROUTES.ADMIN.BANNER_ADD)}
          >
            등록
          </Button>
        </BottomArea>
      </TableWrap>
    </Container>
  );
};

export default withAuth(Banner);

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

const TableWrap = styled.div`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 2rem;
`;

const EmptyText = styled.p`
  width: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
`;

const BottomArea = styled.div`
  width: 100%;
  position: relative;
  ul {
    justify-content: center;
  }
  .addBtn {
    position: absolute;
    right: 10px;
    top: 0;
  }
`;
