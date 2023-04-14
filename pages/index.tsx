import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import styled from '@emotion/styled';
import Banner from '@/components/Main/Banner';
import PopularRegion from '@/components/Main/PopularRegion';
import BestProducts from '@/components/Main/BestProducts';
import TestBanner from '@/../public/main.svg';
import { ROUTES } from '@/constants/routes';

import { isMobile } from 'react-device-detect';
import { useCookies } from 'react-cookie';
import { getUserInfo } from '@/apis/main';
import GroupProduct from '@/components/Main/GroupProduct';
import GroupTrip from '@/components/Main/GroupTrip';

interface Props {
  posts: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
}

declare global {
  interface Window {
    kakao: any;
  }
}
const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY;

const Home = ({ posts }: Props) => {
  const router = useRouter();
  const [cookies, setCookies] = useCookies();
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (cookies.accessToken) {
      (async () => {
        const data = await getUserInfo();
        setUserName(data.userName);
        setUserType(data.userType);
      })();
    }
  }, []);

  const name = userName.slice(-2);

  // 카카오 지도
  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5685382, 126.981834),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(37.5685382, 126.981834);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, []);

  return (
    <HomeContent mobile={isMobile.toString()}>
      <Banner />

      <ContentWrap>
        <h2>추천 그룹 여행</h2>
        <GroupTrip />

        {cookies.accessToken ? (
          <>
            <h2>
              {userType}유형인 {name}님, 여행지 추천해드려요
            </h2>
            <GroupProduct />
          </>
        ) : null}

        <h2>요즘 사람들이 많이 찾는 인기 여행지</h2>
        <PopularRegion />

        <h2>베스트 여행을 확인해보세요!</h2>
        <BestProducts />

        <h2>나는 어떤 여행 유형일까?</h2>
        <TestContent onClick={() => router.push(ROUTES.SURVEY)} mobile={isMobile.toString()}>
          <TestBanner />
        </TestContent>

        <h2>오시는 길</h2>
        <MapContent id="map" mobile={isMobile.toString()} />
        <MapInfo mobile={isMobile.toString()}>
          <p className="title">더 샤이니</p>
          <p className="adress">서울특별시 중구 청계천로40, 한국관광공사 서울센터 818</p>
        </MapInfo>
      </ContentWrap>
    </HomeContent>
  );
};

export default Home;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { data } = await instance.get('https://jsonplaceholder.typicode.com/posts/1');

//   return {
//     props: {
//       posts: data,
//     },
//   };
// }

const HomeContent = styled.div<{ mobile: string }>`
  h2 {
    font-size: ${(props) => (props.mobile === 'true' ? '1.3rem' : '1.8rem')};
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const ContentWrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 0;
  @media (max-width: 1200px) {
    padding: 16px;
  }
`;

const TestContent = styled.div<{ mobile: string }>`
  margin-bottom: ${(props) => (props.mobile === 'true' ? '3rem' : '7rem')};
  cursor: pointer;
  svg {
    width: 100%;
  }
`;

const MapContent = styled.div<{ mobile: string }>`
  width: 100%;
  aspect-ratio: ${(props) => (props.mobile === 'true' ? '1 / 1' : '8 / 3')};
  margin-bottom: 1rem;
`;

const MapInfo = styled.div<{ mobile: string }>`
  display: flex;
  gap: ${(props) => (props.mobile === 'true' ? '0.5rem' : '1rem')};
  .title {
    font-weight: 600;
    font-size: ${(props) => (props.mobile === 'true' ? '1rem' : '1.5rem')};
  }
  .adress {
    margin: auto 0;
    font-size: ${(props) => (props.mobile === 'true' ? '12px' : '1.2rem')};
  }
`;
