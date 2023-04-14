import React, { useEffect, useState } from 'react';
import Depth1 from './Depth1';
import { useDispatch } from 'react-redux';
import { getNavData } from '@/apis/layout';

const AsideNav = () => {
  const [datas, setDatas] = useState([{ categoryName: '', children: [], categoryId: 0 }]);
  const dispatch = useDispatch();

  useEffect(() => {
    getNavData({ setDatas, dispatch });
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
