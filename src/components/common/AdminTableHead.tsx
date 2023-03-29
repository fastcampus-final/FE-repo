import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

interface Props {
  titles: string[];
}

const AdminTableHead = ({ titles }: Props) => {
  return (
    <TableHead>
      <TableRow>
        {titles.map((item, idx) => (
          <TableCell key={idx} align="center">
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default AdminTableHead;
