import React from 'react';
import { TableBody } from '@mui/material';
import { IProduct } from '@/interfaces/product';
import AdminTableRow from './AdminTableRow';

interface Props {
  data: IProduct[];
}

const AdminTableBody = ({ data }: Props) => {
  return (
    <TableBody>
      {data.length > 0 && data.map((row) => <AdminTableRow key={row.productId} data={row} />)}
    </TableBody>
  );
};

export default AdminTableBody;
