import { instance } from '@/api/instance';
import { API_URLS } from '@/constants/apiUrls';
import { IOrder } from '@/interfaces/myorder';
import { getCookie } from '@/utils/cookie';
import React, { useEffect, useState } from 'react';

const order = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    // const token = getCookie('accessToken');
    const getData = async () => {
      await instance({
        method: 'GET',
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  return <div>order</div>;
};

export default order;
