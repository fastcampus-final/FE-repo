import React, { useEffect, useMemo, useState } from 'react';
import AdminTable from './AdminTable';
import { userColumns } from './userColumns';
import { Button } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { getUserTable } from '@/apis/admin/user';

const UserTable = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState({
    content: [
      {
        userId: 0,
        userEmail: '',
        userName: '',
        userRole: '',
      },
    ],
    pageNumber: 1,
    totalPages: 1,
  });

  useEffect(() => {
    getUserTable({ page, setDatas, dispatch });
  }, [page]);

  const columns = useMemo(() => userColumns, []);

  return (
    <div>
      <AdminTable columns={columns} data={datas.content} />
      <ArrowBox>
        {page > 1 && (
          <span>
            <Button
              onClick={() => {
                setPage(1);
              }}
              variant="outlined"
              color="inherit"
            >
              <KeyboardDoubleArrowLeftIcon />
            </Button>
            <Button
              onClick={() => {
                setPage(page - 1);
              }}
              variant="outlined"
              color="inherit"
            >
              <KeyboardArrowLeftIcon />
            </Button>
          </span>
        )}
        <NowPage>현재 페이지 : {page}</NowPage>
        {datas.totalPages > 1 && page !== datas.totalPages && (
          <span>
            <Button onClick={() => setPage(page + 1)} variant="outlined" color="inherit">
              <KeyboardArrowRightIcon />
            </Button>
            <Button
              onClick={() => {
                setPage(datas.totalPages);
              }}
              variant="outlined"
              color="inherit"
            >
              <KeyboardDoubleArrowRightIcon />
            </Button>
          </span>
        )}
      </ArrowBox>
    </div>
  );
};

export default UserTable;

const ArrowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const NowPage = styled.span`
  display: inline-block;
  padding: 0 15px;
`;
