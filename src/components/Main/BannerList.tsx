import { IBanner } from '@/interfaces/main';
import React, { useEffect, useState } from 'react';

import ProductDetailData from '@/dummydata/productDetail.json';
import { ICategory } from '@/interfaces/product';
import styled from '@emotion/styled';

import ArrowRightWhite from '@/../public/icons/ArrowRightWhite.svg';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';
import { getProductDetail } from '@/apis/main';

interface Props {
  data: IBanner;
}

const BannerList = ({ data }: Props) => {
  const [productData, setProductData] = useState('');
  const [categories, setCategories] = useState<Array<ICategory>>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // const detailData = await getProductDetail(data.productId);
      // setProductData(detailData.name);
      // setCategories(detailData.categories);
      setProductData(ProductDetailData.name);
      setCategories(ProductDetailData.categories);
    })();
  });

  return (
    <ListContent>
      {categories && categories.length > 0
        ? categories.map((item) => (
            <span className="categories" key={item.categoryId}>
              # {item.categoryName}
            </span>
          ))
        : null}
      <p className="title">{productData}</p>
      <div className="detail">
        <p onClick={() => router.push(ROUTES.PRODUCT_BY_ID(String(data.productId)))}>자세히 보기</p>
        <ArrowRightWhite />
      </div>
    </ListContent>
  );
};

export default BannerList;

const ListContent = styled.div`
  position: absolute;
  bottom: 10%;
  left: 5%;
  @media screen and (max-width: 1200px) {
    left: 3%;
  }
  .categories {
    color: #fff;
    font-size: 1.5rem;
    margin-right: 0.8rem;
    font-weight: 600;
  }
  .title {
    color: #fff;
    font-size: 3rem;
    margin-bottom: 2rem;
    margin: 0.8rem 0 2rem;
    font-weight: 900;
  }
  .detail {
    color: #fff;
    font-weight: 600;
    font-size: 1.1rem;
    display: flex;
    gap: 1rem;
  }
  svg {
    width: 1rem;
  }
`;
