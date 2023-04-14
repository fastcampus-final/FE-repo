import { getBannerList } from '@/apis/main';
import { IBanner } from '@/interfaces/main';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import { isMobile } from 'react-device-detect';

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
    <BannerContent mobile={isMobile.toString()}>
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
            onClick={() => router.push(ROUTES.PRODUCT_BY_ID(item.productId))}
          >
            <TextContent>
              <p className="tag">{item.tag}</p>
              <p className="mainTitle">{item.title}</p>
              <p className="subTitle">{item.subtitle}</p>

              <div className="more">
                <p>자세히 보기</p>
                <HiOutlineArrowNarrowRight size={25} />
              </div>
            </TextContent>
          </SwiperContent>
        ))}
      </Swiper>
    </BannerContent>
  );
};

export default Banner;

const BannerContent = styled.div<{ mobile: string }>`
  .banner {
    height: ${(props) => (props.mobile === 'true' ? '17rem' : '35rem')};
    margin-bottom: 5rem;
  }
`;

const SwiperContent = styled(SwiperSlide)<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  position: relative;
`;

const TextContent = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  p {
    color: #fff;
  }
  .tag {
    font-size: 1.3rem;
    margin-bottom: 0.2rem;
  }
  .mainTitle {
    font-size: 2.5rem;
    line-height: 3rem;
    font-weight: 600;
    letter-spacing: 5px;
  }
  .subTitle {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    letter-spacing: 2px;
  }
  .more {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;

    &:hover {
      svg {
        transition: all 1s;
        transform: translateX(1.5rem);
      }
    }
    p {
      margin: auto 0;
    }
    svg {
      color: #fff;
      transition: all 1s;
    }
  }
`;
