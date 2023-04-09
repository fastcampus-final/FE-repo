import React, { useEffect, useState } from 'react';

import { IPopolarProduct } from '@/interfaces/main';
import { getUserInfo } from '@/apis/main';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { isMobile } from 'react-device-detect';
import { formatPrice } from '@/utils/format';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';

const GroupProduct = () => {
  const router = useRouter();
  const [product, setProduct] = useState<Array<IPopolarProduct>>([]);

  useEffect(() => {
    (async () => {
      const productData = await getUserInfo();
      setProduct(productData);
    })();
  }, []);
  return (
    <GroupContent mobile={isMobile.toString()}>
      <Swiper slidesPerView={isMobile ? 2.2 : 4.5} spaceBetween={10} className="product">
        {product && product.length > 0 ? (
          product.map((item) => (
            <ProductContent
              key={item.productId}
              image={item.productThumbnail}
              mobile={isMobile.toString()}
              onClick={() =>
                router.push(
                  {
                    pathname: ROUTES.PRODUCT_BY_ID(String(item.productId)),
                    query: {
                      id: item.productId,
                    },
                  },
                  ROUTES.PRODUCT_BY_ID(String(item.productId)),
                )
              }
            >
              <div className="image" />
              {item.categories.map((item) => (
                <div key={item.categoryId} className="category">
                  <p>{item.categoryName}</p>
                </div>
              ))}
              <p className="name">{item.productName}</p>
              <p className="area">{item.productArea}</p>
              <p className="price">{formatPrice(item.productPrice)}</p>
              <p className="status">{item.productStatus}</p>
            </ProductContent>
          ))
        ) : (
          <p>목록이 존재하지 않습니다.</p>
        )}
      </Swiper>
    </GroupContent>
  );
};

export default GroupProduct;

const GroupContent = styled.div<{ mobile: string }>`
  margin-bottom: ${(props) => (props.mobile === 'true' ? '4rem' : '7rem')};
`;

const ProductContent = styled(SwiperSlide)<{ image: string; mobile: string }>`
  .image {
    background-image: url(${(props) => props.image});
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    margin-bottom: 0.6rem;
  }
  .category {
    margin-bottom: 0.6rem;
    margin-right: ${(props) => (props.mobile === 'true' ? '0.2rem' : '0.4rem')};
    display: inline-block;
    background-color: rgba(12, 177, 243, 10%);
    border-radius: 2px;
    padding: ${(props) => (props.mobile === 'true' ? '0.2rem' : '0.4rem')};
    p {
      color: #0cb1f3;
    }
  }
  .name {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
  }
  .area {
    color: #878787;
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
  .price {
    font-weight: 600;
    margin-bottom: 0.3rem;
  }
  .status {
    font-size: 0.9rem;
  }
`;
