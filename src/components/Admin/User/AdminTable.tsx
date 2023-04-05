import React from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import TableSearch from './TableSearch';
import { useRouter } from 'next/router';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const AdminTable = ({ columns, data }: any) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } =
    useTable({ columns, data }, useGlobalFilter, useSortBy);
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <TableSearch onSubmit={setGlobalFilter} />
      <Table {...getTableProps()}>
        <TableHead>
          <TableRow>
            {headerGroups[0].headers.map((header) => (
              // eslint-disable-next-line react/jsx-key
              <TableCell
                {...header.getHeaderProps(header.getSortByToggleProps())}
                onClick={() => {
                  console.log(header.id);
                }}
              >
                {header.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <TableRow
                {...row.getRowProps()}
                onClick={() => {
                  router.push(`/admin/user/${row.original.userId}`);
                }}
              >
                {row.cells.map((cell: any) => (
                  // eslint-disable-next-line react/jsx-key
                  <TableCell
                    {...cell.getCellProps()}
                    // onClick={() => {
                    //   console.log(cell.value);
                    // }}
                  >
                    {cell.value === 'ROLE_ADMIN' ? (
                      <Button variant="contained">{cell.render('Cell')}</Button>
                    ) : (
                      <Button>{cell.render('Cell')}</Button>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminTable;
