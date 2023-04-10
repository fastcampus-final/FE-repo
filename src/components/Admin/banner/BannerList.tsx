import { getProductDetail } from '@/apis/product';
import { ROUTES } from '@/constants/routes';
import { IBanner } from '@/interfaces/banner';
import { TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {
  data: IBanner;
}

const BannerList = ({ data }: Props) => {
  const router = useRouter();
  const [productName, setProductName] = useState('');

  useEffect(() => {
    (async () => {
      const product = await getProductDetail(String(data.productId));
      setProductName(product.name);
    })();
  }, []);

  return (
    <TableRow
      style={{ cursor: 'pointer' }}
      hover
      onClick={() =>
        router.push(
          {
            pathname: ROUTES.ADMIN.BANNER_BY_ID(String(data.bannerId)),
            query: {
              id: data.bannerId,
              product: productName,
            },
          },
          ROUTES.ADMIN.BANNER_BY_ID(String(data.bannerId)),
        )
      }
    >
      <TableCell align="center">{data.bannerId}</TableCell>
      <TableCell align="center">{productName}</TableCell>
    </TableRow>
  );
};

export default BannerList;
