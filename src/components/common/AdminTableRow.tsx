import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { IProduct } from '@/interfaces/product';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { formatPrice } from '@/utils/format';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';

interface Props {
  data: IProduct;
}

const AdminTableRow = ({ data }: Props) => {
  const router = useRouter();

  const rowStyle = {
    cursor: 'pointer',
  };

  return (
    <TableRow
      style={rowStyle}
      hover
      onClick={() => router.push(ROUTES.ADMIN.PRODUCT_BY_ID(data.productId))}
    >
      <TableCell align="center">{data.productId}</TableCell>
      <TableCell align="center">{data.productName}</TableCell>
      <TableCell align="center">{formatPrice(data.productPrice)}</TableCell>
    </TableRow>
  );
};

export default AdminTableRow;
