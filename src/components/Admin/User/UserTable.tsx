import { instance } from '@/apis/instance';
import React, { useEffect, useMemo, useState } from 'react';
import AdminTable from './AdminTable';
import { userColumns } from './userColumns';

const UserTable = () => {
  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState({
    content: [],
    pageNumber: 1,
    totalPages: 1,
  });

  useEffect(() => {
    instance({
      method: 'GET',
      url: `https://www.go-together.store:443/admin/userList?page=${page}`,
    })
      .then((res) => {
        console.log(res);
        setDatas(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = useMemo(() => userColumns, []);
  //   const data = useMemo(() => datas, []);

  //   console.log(columns);
  console.log(datas);

  return (
    <div>
      <AdminTable columns={columns} data={datas.content} />
      <div>
        {page > 1 && (
          <span>
            <button
              onClick={() => {
                setPage(1);
              }}
            >
              처음으로
            </button>
            <button
              onClick={() => {
                setPage(page - 1);
              }}
            >
              이전
            </button>
          </span>
        )}
        <span>현재 페이지 : {page}</span>
        {datas.totalPages > 1 && page !== datas.totalPages && (
          <span>
            <button onClick={() => setPage(page + 1)}>다음</button>
            <button
              onClick={() => {
                setPage(datas.totalPages);
              }}
            >
              마지막으로
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default UserTable;
