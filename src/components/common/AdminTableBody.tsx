import React from 'react';
import { TableBody } from '@mui/material';
import AdminTableRow from './AdminTableRow';
import { IProduct } from '@/interfaces/product';

interface Props {
  data: IProduct[];
}

const AdminTableBody = ({ data }: Props) => {
  return (
    <TableBody>
      {data &&
        data.length > 0 &&
        data.map((row) => <AdminTableRow key={row.productId} data={row} />)}
    </TableBody>
  );
};

export default AdminTableBody;
