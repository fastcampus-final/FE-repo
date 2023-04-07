import { getPopularProduct, getProductCategory, getProductCategoryDetail } from '@/apis/main';
import { ICategory } from '@/interfaces/product';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { isMobile } from 'react-device-detect';
import { IPopolarProduct } from '@/interfaces/main';
import { formatPrice } from '@/utils/format';
import { css } from '@emotion/react';

const BestProducts = () => {
  const [category, setCategory] = useState<Array<ICategory>>([]);
  const [categoryDetail, setCategoryDetail] = useState<Array<ICategory>>([]);
  const [product, setProduct] = useState<Array<IPopolarProduct>>([]);
  const [click, setClick] = useState(0);

  useEffect(() => {
    (async () => {
      const categoryData = await getProductCategory();
      setCategory(categoryData);

      const categoryDetailData = await getProductCategoryDetail('3');
      setCategoryDetail(categoryDetailData.children);

      const productData = await getPopularProduct();
      setProduct(productData);
    })();
  }, []);

  const bestProduct = async (id?: number) => {
    const data = await getPopularProduct(id);
    setProduct(data);
  };

  return (
    <BestContent mobile={isMobile.toString()}>
      <Swiper spaceBetween={10} className="category" slidesPerView={isMobile ? 6 : 17}>
        <CategoryContnet
          click={click}
          value={0}
          onClick={() => {
            setClick(0);
            bestProduct();
          }}
        >
          <p>전체</p>
        </CategoryContnet>
        {categoryDetail.map((item) => (
          <CategoryContnet
            key={item.categoryId}
            click={click}
            value={item.categoryId}
            onClick={() => {
              setClick(item.categoryId);
              bestProduct(item.categoryId);
            }}
          >
            <p>{item.categoryName}</p>
          </CategoryContnet>
        ))}
      </Swiper>
      <Swiper slidesPerView={isMobile ? 2.2 : 4.5} spaceBetween={10} className="product">
        {product && product.length > 0 ? (
          product.map((item) => (
            <ProductContent
              key={item.productId}
              image={item.productThumbnail}
              mobile={isMobile.toString()}
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
    </BestContent>
  );
};

export default BestProducts;

const BestContent = styled.div<{ mobile: string }>`
  margin-bottom: ${(props) => (props.mobile === 'true' ? '3rem' : '7rem')};
`;

const CategoryContnet = styled(SwiperSlide)<{ click: number; value: number }>`
  padding: 0.4rem 0.6rem;
  border-radius: 16.5px;
  border: 1px solid #cdcdcd;
  display: inline-block;
  text-align: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
  p {
    color: #878787;
  }
  ${(props) =>
    props.click === props.value &&
    css`
      background-color: #101010;
      color: #fff;
    `}
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
    line-height: 1rem;
  }
  .price {
    font-weight: 600;
    margin-bottom: 0.3rem;
  }
  .status {
    font-size: 0.9rem;
  }
`;
