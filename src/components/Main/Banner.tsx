import { getBannerList } from '@/apis/main';
import { IBanner } from '@/interfaces/main';
import React, { useEffect, useState } from 'react';

import BannerListData from '@/dummydata/bannerList.json';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import BannerList from './BannerList';

const Banner = () => {
  const [bannerList, setBannerList] = useState<Array<IBanner>>([]);

  useEffect(() => {
    (async () => {
      // const data = await getBannerList();
      // setBannerList(data);
      setBannerList(BannerListData);
    })();
  }, []);

  console.log(bannerList);

  return (
    <BannerContent>
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
        {bannerList.map((item) => (
          <SwiperContent key={item.bannerId} image={item.image}>
            <BannerList data={item} />
          </SwiperContent>
        ))}
      </Swiper>
    </BannerContent>
  );
};

export default Banner;

const BannerContent = styled.div``;

const SwiperContent = styled(SwiperSlide)<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  position: relative;
`;
