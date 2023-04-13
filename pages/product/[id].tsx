import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Image from '@/../../src/components/common/Image';
import { IProductDetail, IReservation } from '@/interfaces/product';
import { formatPrice } from '@/utils/format';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';
import { BsShare } from 'react-icons/bs';

import Select, { OnChangeValue } from 'react-select';
import { IWish } from '@/interfaces/wish';
import { deleteWishList, getWishList, postWishList } from '@/apis/wish';

import { getProductDetail, getRelatedProducts } from '@/apis/product';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { useCookies } from 'react-cookie';
import { isMobile } from 'react-device-detect';

import Parser from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { postCart } from '@/apis/cart';
import { ICartAdd } from '@/interfaces/cart';

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
      const productId = window.location.pathname.slice(9);
      const productData = await getProductDetail(
        Object(router.query).length > 0 ? Number(router.query.id) : Number(productId),
      );
      setProductDetail(productData);

      if (cookies.accessToken) {
        const wishData = await getWishList();
        setWishList(wishData);
      }

      const relatedData = await getRelatedProducts(
        Object(router.query).length > 0 ? Number(router.query.id) : Number(productId),
      );
      setRelatedProduct(relatedData);
    })();
  }, []);

  useEffect(() => {
    if (wishList) {
      wishList.findIndex((e) => e.productId === Number(productDetail?.productId)) === 1 &&
        setWishClick(true);
    }
  }, []);

  const productPrice = Number(productDetail?.price);

  const SingleOption = [
    {
      value: 1,
      label: `1인 싱글룸 사용시 추가 ${formatPrice(Number(productDetail?.singleRoomPrice))}`,
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
      setTotalPrice(totalPrice + Number(productDetail?.singleRoomPrice));
    } else {
      setSingle(option?.label as string);
      setSingleCount(option?.value as number);
      setTotalPrice(totalPrice + Number(productDetail?.singleRoomPrice));
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

  const addCartItem = () => {
    if (items.length > 0) {
      items.map((item) => {
        const params: ICartAdd = {
          numberOfPeople: totalMember,
          productId: productDetail!.productId,
          productOptionId: item.optionId,
          singleRoomNumber: singleCount,
        };
        postCart(params);
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

  const addWish = () => {
    const params = {
      productId: productDetail?.productId,
    };
    if (cookies.accessToken) {
      try {
        postWishList(params);
      } catch (error) {
        return dispatch(
          setModal({
            isOpen: true,
            text: MESSAGES.ERROR,
            onClickOk: () =>
              dispatch(
                setModal({
                  isOpen: false,
                }),
              ),
          }),
        );
      } finally {
        setWishClick(true);
      }
    } else {
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
    }
  };

  const deleteWish = () => {
    let id;
    wishList && wishList.findIndex((e) => (id = e.wishlistId));
    try {
      deleteWishList(Number(id));
    } catch (error) {
      return dispatch(
        setModal({
          isOpen: true,
          text: MESSAGES.ERROR,
          onClickOk: () =>
            dispatch(
              setModal({
                isOpen: false,
              }),
            ),
        }),
      );
    } finally {
      setWishClick(false);
    }
  };

  const shareClick = () => {
    return dispatch(
      setModal({
        share: true,
        isOpen: true,
        text: '공유하기',
        onClickOk: () =>
          dispatch(
            setModal({
              isOpen: false,
            }),
          ),
      }),
    );
  };

  return (
    <DetailContent>
      <Simple>
        <Image src={productDetail?.thumbnail} alt="product image" />
        <TextContent>
          <h2>{productDetail?.name}</h2>
          <div className="price">
            <p>{formatPrice(productPrice)}</p>
            <BsShare size={20} onClick={() => shareClick()} />
          </div>
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
                    setTotalPrice(
                      totalPrice - Number(productDetail?.singleRoomPrice) * singleCount,
                    );
                    setSingle('');
                  }}
                />
              </p>
              <button
                onClick={() => {
                  if (singleCount > 1) {
                    setSingleCount(singleCount - 1);
                    setTotalPrice(totalPrice - Number(productDetail?.singleRoomPrice));
                  }
                }}
              >
                -
              </button>
              <p className="count">{singleCount}</p>
              <button
                onClick={() => {
                  setSingleCount(singleCount + 1);
                  setTotalPrice(totalPrice + Number(productDetail?.singleRoomPrice));
                }}
              >
                +
              </button>
              <p className="itemPrice">
                {formatPrice(Number(productDetail?.singleRoomPrice) * singleCount)}
              </p>
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
                addCartItem();
              }}
            >
              장바구니
            </button>
            {(wishList &&
              wishList.findIndex((e) => e.productId === Number(productDetail?.productId)) === 1) ||
            wishClick === true ? (
              <AiFillHeart size={25} onClick={() => deleteWish()} />
            ) : (
              <AiOutlineHeart size={25} onClick={() => addWish()} />
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
                        pathname: ROUTES.PRODUCT_BY_ID(Number(item.productId)),
                        query: {
                          id: item.productId,
                        },
                      },
                      ROUTES.PRODUCT_BY_ID(Number(item.productId)),
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
    border-bottom: 1px solid rgba(33, 37, 41, 0.2);
    padding-bottom: 24px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    p {
      font-size: 1.5rem;
      font-weight: 500;
      color: #4581f8;
    }
    svg {
      width: 15%;
    }
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
