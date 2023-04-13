import { instance } from '@/apis/instance';
import React, { useEffect, useState } from 'react';
import Depth1 from './Depth1';
import { alterModal } from '@/components/SignIn/function';
import { useDispatch } from 'react-redux';

const AsideNav = () => {
  const [datas, setDatas] = useState([{ categoryName: '', children: [], categoryId: 0 }]);
  const dispatch = useDispatch();

  useEffect(() => {
    instance({
      method: 'GET',
      url: 'https://www.go-together.store:443/categories',
    })
      .then((res) => {
        setDatas(res.data);
      })
      .catch(() => {
        alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
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
