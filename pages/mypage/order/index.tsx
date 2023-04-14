import PageTitle from '@/components/common/PageTitle';
import MyPageNavbar from '@/components/layout/MyPageNavbar';
import { IOrder } from '@/interfaces/mypageOrder';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import ScheduledOrder from '@/components/Mypage/Order/ScheduledOrder';
import PastOrder from '@/components/Mypage/Order/PastOrder';
import { getReservationList } from '@/apis/mypage/order';

const MyOrder = () => {
  const [scheduledData, setScheduledData] = useState<Array<IOrder>>([]);
  const [pastData, setPastData] = useState<Array<IOrder>>([]);

  useEffect(() => {
    (async () => {
      const data = await getReservationList();
      setScheduledData(data && data.scheduledTravel.content);
      setPastData(data && data.pastTravel.content);
    })();
  });
  return (
    <Container>
      <MyPageNavbar />
      <MyOrderContnet>
        <PageTitle title="나의 예약 내역" />

        <SubTitle>
          <p>예정된 여행</p>
        </SubTitle>

        <ListContent>
          {scheduledData && scheduledData.length > 0 ? (
            scheduledData.map((item, i) => <ScheduledOrder key={i} data={item} />)
          ) : (
            <p>목록이 존재하지 않습니다.</p>
          )}
        </ListContent>

        <SubTitle>
          <p>지난 여행</p>
        </SubTitle>

        <ListContent>
          {pastData && pastData.length > 0 ? (
            pastData.map((item, i) => <PastOrder key={i} data={item} />)
          ) : (
            <p>목록이 존재하지 않습니다.</p>
          )}
        </ListContent>
      </MyOrderContnet>
    </Container>
  );
};

export default MyOrder;

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1200px;
  gap: 30px;
  box-sizing: border-box;
  padding: 16px 0;
  @media (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
    flex-direction: column-reverse;
  }
  @media (max-width: 1200px) {
    padding: 16px;
  }
`;

const MyOrderContnet = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const SubTitle = styled.div`
  margin: 30px 0;
  font-size: 1.4rem;
  font-weight: 600;
`;

const ListContent = styled.div``;
