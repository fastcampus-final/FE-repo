import { getBannerList } from '@/apis/main';
import { IBanner } from '@/interfaces/main';
import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';

const Banner = () => {
  const router = useRouter();
  const [bannerList, setBannerList] = useState<Array<IBanner>>([]);

  useEffect(() => {
    (async () => {
      const data = await getBannerList();
      setBannerList(data);
    })();
  }, []);

  return (
    <BannerContent>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
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
          <SwiperContent
            key={item.bannerId}
            image={item.image}
            onClick={() => router.push(ROUTES.PRODUCT_BY_ID(String(item.productId)))}
          ></SwiperContent>
        ))}
      </Swiper>
    </BannerContent>
  );
};

export default Banner;

const BannerContent = styled.div`
  .banner {
    height: 550px;
    margin-bottom: 5rem;
    width: 100%;
  }
`;

const SwiperContent = styled(SwiperSlide)<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  position: relative;
`;
