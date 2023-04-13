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
              // eslint-disable-next-line react/jsx-key
              <TableCell {...header.getHeaderProps(header.getSortByToggleProps())}>
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
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell: any) => (
                  // eslint-disable-next-line react/jsx-key
                  <TableCell {...cell.getCellProps()}>
                    {cell.value === undefined &&
                      cell.row.original.reservationProductList.map((item: any) => (
                        <Button key={item.reservationDetailId}>{item[cell.column.id]}</Button>
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
