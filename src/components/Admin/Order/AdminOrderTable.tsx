import React from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
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
import { formatPrice } from '@/utils/format';
import { instance } from '@/apis/instance';
import { patchOrderData } from '@/apis/admin/order';

const AdminOrderTable = ({ columns, data }: any) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
  );

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          <TableRow>
            {headerGroups[0].headers.map((header) => (
              <TableCell {...header.getHeaderProps(header.getSortByToggleProps())} key={header.id}>
                {header.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell: any) => (
                  <TableCell {...cell.getCellProps()} key={cell.row.id + cell.value}>
                    {cell.value === undefined &&
                      cell.column.id === 'productName' &&
                      cell.row.original.reservationProductList.map((item: any) => (
                        <Button key={item.reservationDetailId}>{item[cell.column.id]}</Button>
                      ))}
                    {cell.value === undefined &&
                      cell.column.id === 'reservationStatus' &&
                      cell.row.original.reservationProductList.map((item: any) => (
                        <select
                          key={item.reservationDetailId}
                          onChange={(event) => {
                            patchOrderData({ item, event });
                          }}
                        >
                          <option
                            value="결제 대기중"
                            selected={item[cell.column.id] === '결제 대기중'}
                          >
                            결제 대기중
                          </option>
                          <option value="예약 완료" selected={item[cell.column.id] === '예약 완료'}>
                            예약 완료
                          </option>
                        </select>
                      ))}
                    {cell.column.id === 'totalAmount' && <Button>{formatPrice(cell.value)}</Button>}
                    {cell.column.id === 'reservationDate' && (
                      <Button>{cell.value.slice(0, 10)}</Button>
                    )}
                    {cell.value !== undefined &&
                      cell.column.id !== 'totalAmount' &&
                      cell.column.id !== 'reservationDate' && (
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

export default AdminOrderTable;
