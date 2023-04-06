import { instance } from '@/apis/instance';
import { API_URLS } from '@/constants/apiUrls';
import { IOrder } from '@/interfaces/myorder';
import { getCookie } from '@/utils/cookie';
import React, { useEffect, useState } from 'react';

const reservation = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await instance({
        method: 'GET',
        url: '/reservations',
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

export default reservation;
