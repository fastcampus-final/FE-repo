import { getPopularRegions } from '@/apis/main';
import { getProductList } from '@/apis/product';
import { IRegions } from '@/interfaces/main';
import { getStorage, setStorage } from '@/utils/storage';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';

const PopularRegion = () => {
  const [regions, setRegions] = useState<Array<IRegions>>([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const data = await getPopularRegions();
      setRegions(data);
    })();
  }, []);

  return (
    <RegionContent mobile={isMobile.toString()}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={isMobile ? 3.3 : 4.7}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        speed={5000}
        className="city"
      >
        {regions.map((item) => (
          <SwiperContent
            key={item.regionId}
            image={item.image}
            mobile={isMobile.toString()}
            onClick={() =>
              router.push(
                {
                  pathname: ROUTES.SEARCH,
                  query: {
                    keyword: item.regionName,
                  },
                },
                ROUTES.SEARCH,
              )
            }
          >
            <div className="image"></div>
            <p className="name">{item.regionName}</p>
          </SwiperContent>
        ))}
      </Swiper>
    </RegionContent>
  );
};

export default PopularRegion;

const RegionContent = styled.div<{ mobile: string }>`
  margin-bottom: ${(props) => (props.mobile === 'true' ? '4rem' : '7rem')};
`;

const SwiperContent = styled(SwiperSlide)<{ image: string; mobile: string }>`
  aspect-ratio: 1 / 1;
  text-align: center;

  .image {
    width: ${(props) => (props.mobile === 'true' ? '95%' : '85%')};
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-image: url(${(props) => props.image});
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
  }
  .name {
    margin-top: 1rem;
    color: #585858;
  }
`;
