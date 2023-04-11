import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Image from '@/../../src/components/common/Image';
import { IProductDetail, IReservation } from '@/interfaces/product';
import { formatPrice } from '@/utils/format';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';

import Select, { OnChangeValue } from 'react-select';
import { IWish } from '@/interfaces/wish';
import { getWishList, postAddCart } from '@/apis/wishlist';

import WishData from '@/dummydata/wishList.json';
import DetailData from '@/dummydata/productDetail.json';
import RelatedData from '@/dummydata/relatedProducts.json';
import { getProductDetail, getRelatedProducts } from '@/apis/product';
import product from '../admin/product';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { useCookies } from 'react-cookie';
import reservation from '../mypage/reservation';
import { isMobile } from 'react-device-detect';

import Parser from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

interface IItemOption {
  optionDate: string;
  optionId: number;
}

interface ICountType {
  count: number;
}

const ProductDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies();

  const [productDetail, setProductDetail] = useState<IProductDetail>();
  const [relatedProduct, setRelatedProduct] = useState<IProductDetail[]>([]);

  const [single, setSingle] = useState('');
  const [singleCount, setSingleCount] = useState(0);

  const [items, setItems] = useState<Array<IItemOption>>([]);
  const [itemCounts, setItemCounts] = useState<Array<ICountType>>([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalMember, setTotalMember] = useState(0);

  const [wishList, setWishList] = useState<Array<IWish>>([]);
  const [wishClick, setWishClick] = useState(false);

  const [isViewMore, setIsViewMore] = useState(false);

  useEffect(() => {
    (async () => {
      const productData = await getProductDetail(Number(router.query.id));
      setProductDetail(productData);

      if (cookies.accessToken) {
        const wishData = await getWishList();
        setWishList(wishData);
      }

      const relatedData = await getRelatedProducts(Number(router.query.id));
      setRelatedProduct(relatedData);
    })();
  }, []);

  const productPrice = Number(productDetail?.price);

  const SingleOption = [
    {
      value: 1,
      label: `1인 싱글룸 사용시 추가 ${formatPrice(DetailData.singleRoomPrice)}`,
    },
  ];

  const dateSelect = (option: any) => {
    const optionDate = option?.label;
    const optionId = option.id;
    const count = 1;

    if (items.some((item) => item.optionDate === optionDate)) {
      alert('이미 선택하신 옵션입니다.');
    } else {
      const newItem = {
        optionDate,
        optionId,
      };

      const newCount = {
        count,
      };

      setItems([newItem, ...items]);
      setItemCounts([newCount, ...itemCounts]);
      setTotalPrice(totalPrice + productPrice * count);
      setTotalMember(totalMember + count);
    }
  };

  const singleSelect = (option: OnChangeValue<{ value: number; label: string }, false>) => {
    if (single !== '') {
      setSingleCount(singleCount + 1);
      setTotalPrice(totalPrice + DetailData.singleRoomPrice);
    } else {
      setSingle(option?.label as string);
      setSingleCount(option?.value as number);
      setTotalPrice(totalPrice + DetailData.singleRoomPrice);
    }
  };

  const plusClick = (i: number) => {
    const plus = [...itemCounts];
    plus[i].count += 1;
    setItemCounts([...plus]);

    setTotalPrice(totalPrice + productPrice);
    setTotalMember(totalMember + 1);
  };

  const minusClick = (i: number) => {
    const minus = [...itemCounts];
    minus[i].count -= 1;
    setItemCounts([...minus]);

    setTotalPrice(totalPrice - productPrice);
    setTotalMember(totalMember - 1);
  };

  const removeItem = (i: number) => {
    setTotalPrice(totalPrice - productPrice * itemCounts[i]?.count);
    setTotalMember(totalMember - itemCounts[i]?.count);

    const itemRemove = [...items];
    itemRemove.splice(i, 1);
    setItems([...itemRemove]);

    const countRemove = [...itemCounts];
    countRemove.splice(i, 1);
    setItemCounts([...countRemove]);
  };

  const addCart = () => {
    if (items.length > 0) {
      items.map((item) => {
        const params = {
          numberOfPeople: totalMember,
          productId: productDetail?.productId,
          productOptionId: item.optionId,
          singleRoomNumber: singleCount,
        };
        postAddCart(params);
      });
      return dispatch(
        setModal({
          isOpen: true,
          text: MESSAGES.PRODUCT_DETAIL.ADD_CART,
          onClickOk: () => {
            dispatch(
              setModal({
                isOpen: false,
              }),
            ),
              router.push(ROUTES.CART);
          },
          onClickCancel: () =>
            dispatch(
              setModal({
                isOpen: false,
              }),
            ),
        }),
      );
    } else {
      return dispatch(
        setModal({
          isOpen: true,
          text: MESSAGES.PRODUCT_DETAIL.OPTION_ERROR,
          onClickOk: () =>
            dispatch(
              setModal({
                isOpen: false,
              }),
            ),
        }),
      );
    }
  };

  const addReservation = () => {
    const reservationData: IReservation[] = [];

    if (items.length > 0 && cookies.accessToken && cookies.accessToken.length > 0) {
      items.map((item) => {
        const params = {
          reservationPeopleNumber: totalMember,
          productId: productDetail?.productId,
          productOptionId: item.optionId,
          reservationSingleRoomNumber: singleCount,
        };
        reservationData.push(params);
      });
      router.push(
        {
          pathname: ROUTES.ORDER,
          query: {
            data: JSON.stringify(reservationData),
          },
        },
        ROUTES.ORDER,
      );
    } else if (!cookies.accessToken) {
      return dispatch(
        setModal({
          isOpen: true,
          text: MESSAGES.INVALID_AUTH,
          onClickOk: () => {
            dispatch(
              setModal({
                isOpen: false,
              }),
            ),
              router.push(ROUTES.LOGIN);
          },
        }),
      );
    } else if (items.length === 0) {
      return dispatch(
        setModal({
          isOpen: true,
          text: MESSAGES.PRODUCT_DETAIL.OPTION_ERROR,
          onClickOk: () =>
            dispatch(
              setModal({
                isOpen: false,
              }),
            ),
        }),
      );
    }
  };

  const ViewMoreClick = () => {
    setIsViewMore(!isViewMore);
  };

  return (
    <DetailContent>
      <Simple>
        <Image src={productDetail?.thumbnail} alt="product image" />
        <TextContent>
          <h2>{productDetail?.name}</h2>
          <p className="price">{formatPrice(productPrice)}</p>
          <p className="summary">{productDetail?.summary}</p>
          <p className="title">여행 지역</p>
          <p className="detail">{productDetail?.area}</p>
          <p className="title">여행 특징</p>
          <p className="detail">{productDetail?.feature}</p>
          <p className="title">여행 항공</p>
          <p className="detail">{productDetail?.airplane}</p>
          <p className="dropTitle">출발일</p>

          <Select
            onChange={dateSelect}
            options={productDetail?.productOptions?.map((item, idx) => {
              return {
                label: `${item.startDate} 출발 ~ ${item.endDate} 도착`,
                value: idx,
                id: item.productOptionId,
              };
            })}
            placeholder="출발일을 선택해 주세요 (필수)"
          />

          <p className="dropTitle">싱글차지</p>
          <Select
            onChange={singleSelect}
            options={SingleOption}
            placeholder="싱글룸을 이용하려면 선택해 주세요 (선택)"
            className="singleSelect"
          />

          {items.length > 0
            ? items.map((item, i: number) => {
                return (
                  <ItemContent key={i}>
                    <p className="itemTitle">
                      {item?.optionDate} <RxCrossCircled onClick={() => removeItem(i)} />
                    </p>
                    <button
                      onClick={() => {
                        if (itemCounts[i].count > 1) {
                          minusClick(i);
                        }
                      }}
                    >
                      -
                    </button>
                    <p className="count">{itemCounts[i].count}</p>
                    <button
                      onClick={() => {
                        plusClick(i);
                      }}
                    >
                      +
                    </button>
                    <p className="itemPrice">{formatPrice(productPrice * itemCounts[i].count)}</p>
                  </ItemContent>
                );
              })
            : null}

          {single !== '' ? (
            <ItemContent>
              <p className="itemTitle">
                {single}{' '}
                <RxCrossCircled
                  onClick={() => {
                    setTotalPrice(totalPrice - DetailData.singleRoomPrice * singleCount);
                    setSingle('');
                  }}
                />
              </p>
              <button
                onClick={() => {
                  if (singleCount > 1) {
                    setSingleCount(singleCount - 1);
                    setTotalPrice(totalPrice - DetailData.singleRoomPrice);
                  }
                }}
              >
                -
              </button>
              <p className="count">{singleCount}</p>
              <button
                onClick={() => {
                  setSingleCount(singleCount + 1);
                  setTotalPrice(totalPrice + DetailData.singleRoomPrice);
                }}
              >
                +
              </button>
              <p className="itemPrice">{formatPrice(DetailData.singleRoomPrice * singleCount)}</p>
            </ItemContent>
          ) : null}

          {items.length > 0 || single !== '' ? (
            <TotalContent>
              <p>총 상품금액 ( {totalMember} 명 )</p>
              <p className="totalPrice">{formatPrice(totalPrice)}</p>
            </TotalContent>
          ) : null}

          <ButtonContent>
            <button className="blue" onClick={() => addReservation()}>
              예약하기
            </button>
            <button
              className="white"
              onClick={() => {
                addCart();
              }}
            >
              장바구니
            </button>
            {wishList.findIndex((e) => e.productId === Number(router.query.id)) === 0 ? (
              <AiFillHeart size={25} />
            ) : (
              <AiOutlineHeart size={25} />
            )}
          </ButtonContent>
        </TextContent>
      </Simple>

      <MainContent isViewMore={isViewMore}>
        {productDetail && Parser(productDetail?.detail)}
      </MainContent>

      <ViewMoreContent isViewMore={isViewMore}>
        <button onClick={ViewMoreClick}>{isViewMore ? '상품정보 접기' : '상품정보 더보기'}</button>
      </ViewMoreContent>

      <RelatedContent>
        <p className="subTitle">관련상품</p>
        <Swiper slidesPerView={isMobile ? 2 : 4} spaceBetween={10}>
          {relatedProduct && relatedProduct.length > 0
            ? relatedProduct.map((item) => (
                <RelatedList
                  key={item.productId}
                  imageUrl={item.thumbnail}
                  onClick={() =>
                    router.push(
                      {
                        pathname: ROUTES.PRODUCT_BY_ID(item.productId),
                        query: {
                          id: item.productId,
                        },
                      },
                      ROUTES.PRODUCT_BY_ID(item.productId),
                    )
                  }
                >
                  <div className="image" />
                  <p className="name">{item.name}</p>
                </RelatedList>
              ))
            : null}
        </Swiper>
      </RelatedContent>
    </DetailContent>
  );
};

export default ProductDetail;

const DetailContent = styled.div`
  margin: 3rem auto 0;
  @media (max-width: 1000px) {
    padding: 1rem;
    margin: 1rem auto 0;
  }
`;

const Simple = styled.div`
  @media (max-width: 1000px) {
    display: block;
    img {
      width: 100%;
      aspect-ratio: 2 / 1.5;
      margin-bottom: 1.5rem;
    }
  }
  display: flex;
  gap: 3rem;
  justify-content: center;
`;

const TextContent = styled.div`
  @media (max-width: 1000px) {
    width: 80%;
    margin: auto;
  }
  width: 30%;
  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .price {
    font-size: 1.5rem;
    font-weight: 500;
    border-bottom: 1px solid rgba(33, 37, 41, 0.2);
    color: #4581f8;
    padding-bottom: 24px;
    margin-bottom: 24px;
  }
  .summary {
    font-size: 1.2rem;
    width: 80%;
    line-height: 1.8rem;
    color: rgb(153, 153, 153);
    margin-bottom: 24px;
  }
  .title {
    font-weight: 500;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  .detail {
    line-height: 1.5rem;
    margin-bottom: 1rem;
  }
  .dropTitle {
    font-weight: 500;
    margin: 36px 0 10px;
  }
  .singleSelect {
    margin-bottom: 40px;
  }
`;

const ItemContent = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(33, 37, 41, 0.1);
  .itemTitle {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #999;
  }
  .count {
    display: inline-block;
    margin: auto 15px;
  }
  .itemPrice {
    display: inline-block;
    float: right;
  }
  svg {
    float: right;
    font-size: 1.2rem;
  }
`;

const TotalContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 0;
  p {
    margin: auto 0;
  }
  .totalPrice {
    color: #4581f8;
    font-size: 1.4rem;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  button {
    border-radius: 8px;
    width: 40%;
    height: 2.5rem;
    font-weight: 600;
    border: 1px solid #0cb1f3;
  }
  .white {
    color: #0cb1f3;
    background-color: #fff;
  }
  .blue {
    color: #fff;
    background-color: #0cb1f3;
  }
  svg {
    color: #0cb1f3;
    margin: auto;
  }
`;

const MainContent = styled.div<{ isViewMore: boolean }>`
  margin-top: 5rem;
  text-align: center;
  max-height: ${(props) => (props.isViewMore ? '' : '400px')};
  overflow: hidden;
  img {
    width: 100%;
    @media (min-width: 1000px) {
      width: 60%;
    }
  }
`;

const ViewMoreContent = styled.div<{ isViewMore: boolean }>`
  position: relative;
  text-align: center;
  & ::before {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 100%;
    height: ${(props) => (props.isViewMore ? '' : '50px')};
    background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 90%);
    content: '';
  }
  button {
    border: 1px solid rgba(33, 37, 41, 0.2);
    background-color: transparent;
    font-size: 1.1rem;
    letter-spacing: 3px;
    padding: 0.7rem 2.5rem;
    border-radius: 8px;
    margin-top: 20px;
    transition: all 0.3s ease-in-out;
    &:hover {
      border: 1px solid #0cb1f3;
    }
  }
`;

const RelatedContent = styled.div`
  margin-top: 5rem;
  padding: 0 15rem;
  @media (max-width: 1000px) {
    padding: 0 3rem;
  }
  .subTitle {
    margin-bottom: 1.5rem;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 2px;
  }
`;

const RelatedList = styled(SwiperSlide)<{ imageUrl: string }>`
  text-align: center;
  .image {
    aspect-ratio: 3/2;
    background-image: url(${(props) => props.imageUrl});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    border-radius: 8px;
  }
  .name {
    margin-top: 1rem;
  }
`;
