import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { ILike } from '@/interfaces/like';
import { instance } from '../src/apis/instance';
import { useRouter } from 'next/router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import styled from '@emotion/styled';

interface Props {
  posts: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
}

const Home = ({ posts }: Props) => {
  const [cityWidth, setCityWidth] = useState(0);
  const anchorRef = useRef<any>(0);
  const router = useRouter();

  useEffect(() => {
    setCityWidth(anchorRef.current.offsetWidth);
  }, [cityWidth]);

  return (
    <HomeContent>
      <Head>
        <title>고투게더</title>
      </Head>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        speed={5000}
        pagination={{ clickable: true }}
        className="banner"
      >
        {/* {likeList?.content.map((item: ILike, idx: number) => (
          <SwiperSlide key={idx}>
            <p>{idx + 1}</p>
          </SwiperSlide>
        ))} */}
      </Swiper>

      <ContentWrap>
        <h2>그룹 추천 여행</h2>
        <GroupContent>
          <div className="group">
            <div>
              <p>active SENIOR</p>
            </div>
            <div>
              <p>with ANYONE</p>
            </div>
          </div>
          <div className="group">
            <div>
              <p>WOMEN only</p>
            </div>
            <div>
              <p>MEN only</p>
            </div>
            <div>
              <p>with ANYONE</p>
            </div>
          </div>
        </GroupContent>

        <TestContent onClick={() => router.push('/')}>
          <div className="text">
            <p>나의 여행 유형이 궁금하다면?</p>
            <h3>여행 유형 테스트 하러가기</h3>
          </div>
        </TestContent>

        <h2>인기 도시</h2>
        <CityContent width={cityWidth}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={15}
            slidesPerView={5}
            loop={true}
            autoplay={{
              delay: 3000,
            }}
            speed={5000}
            className="city"
          >
            {/* {likeList?.content.map((item: ILike, idx: number) => (
            <SwiperSlide key={idx}>
              <div ref={anchorRef}>{item.productId}</div>
            </SwiperSlide>
          ))} */}
          </Swiper>
        </CityContent>

        <h2>베스트 여행을 확인해보세요! -{'>'} 회원의 경우 이자리에 추천...?</h2>
        <BestContent>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={15}
            slidesPerView={4}
            loop={true}
            autoplay={{
              delay: 3000,
            }}
            speed={5000}
            className="best"
          >
            {/* {likeList?.content.map((item: ILike, idx: number) => (
            <SwiperSlide key={idx}>
              <div>{item.productId}</div>
            </SwiperSlide>
          ))} */}
          </Swiper>
        </BestContent>

        <TestContent onClick={() => router.push('/')}>
          <div className="text">
            <p>드디어 산티아고 오픈!</p>
            <h3>산티아고 순례길 여행설명회가 열립니다</h3>
          </div>
        </TestContent>
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

const HomeContent = styled.div`
  .banner {
    background-color: #999;
    height: 550px;
    margin-bottom: 5rem;
    width: 100%;
  }
  h2 {
    font-size: 2rem;
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

const GroupContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 7rem;
  .group {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    div {
      width: 100%;
      height: 13rem;
      background-color: #999;
      position: relative;
      p {
        font-size: 1.3rem;
        position: absolute;
        bottom: 10%;
        left: 5%;
      }
    }
  }
`;

const TestContent = styled.div`
  height: 15rem;
  width: 100%;
  background-color: #999;
  margin-bottom: 7rem;
  .text {
    margin: 5rem 8rem 0;
    display: inline-block;
    p {
      font-size: 1.7rem;
      line-height: 2;
    }
    h3 {
      font-size: 2.5rem;
    }
  }
`;

const CityContent = styled.div<{ width: number }>`
  margin-bottom: 7rem;
  .city {
    .swiper-slide {
      background-color: #999;
      height: ${(props) => props.width}px;
      border-radius: 50%;
    }
  }
`;

const BestContent = styled.div`
  margin-bottom: 7rem;
  .best {
    .swiper-slide {
      background-color: #999;
      border-radius: 10px;
      height: 20rem;
    }
  }
`;
