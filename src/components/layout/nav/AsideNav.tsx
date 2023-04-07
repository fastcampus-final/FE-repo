import { instance } from '@/apis/instance';
import React, { useEffect, useState } from 'react';
import Depth1 from './Depth1';

const AsideNav = () => {
  const [datas, setDatas] = useState([{ categoryName: '', children: [], categoryId: 0 }]);

  useEffect(() => {
    instance({
      method: 'GET',
      url: 'https://www.go-together.store:443/categories',
    })
      .then((res) => {
        // console.log(res.data);
        setDatas(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {datas.map((data) => (
        <Depth1 data={data} key={data.categoryId} />
      ))}
    </div>
  );
};

export default AsideNav;
