import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Image from '@/../../src/components/common/Image';
import { IDetail } from '@/interfaces/product';
import { formatPrice } from '@/utils/format';

import { AiOutlineHeart } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';

import Select, { OnChangeValue } from 'react-select';

const tempData: IDetail = {
  productId: '1',
  title: '호주 시드니 8일',
  price: '2699000',
  imagePath: 'https://picsum.photos/id/10/350/350',
  summary:
    '4050 여성들 누구나 참가하는 조지아 일주 여행 코카서스의 백미 조지아를 샅샅히 둘러보는 상품 패키지의 안전함과 자유여행의 즐거움을 동시에~',
  area: '트빌리시/카즈베기/바르지아/보르조미/쿠타이시/메스티아/바투미/고리/우플리시케/시그나기/크바렐리',
  point: '포함투어 12개(타사상품 비교必)/No팁/No쇼핑/No옵션',
  airline: '인천-트빌리시 왕복 항공',
};

interface IItemOption {
  optionDate: string;
}

interface ICountType {
  count: number;
}

const ProductDetail = () => {
  const router = useRouter();

  const [single, setSingle] = useState('');
  const [singleCount, setSingleCount] = useState(1);

  const [items, setItems] = useState<Array<IItemOption>>([]);
  const [itemCounts, setItemCounts] = useState<Array<ICountType>>([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalMember, setTotalMember] = useState(0);

  const productPrice = Number(tempData.price);

  const DateOptions = [
    {
      value: 1,
      label: '2023/05/30(화)출발 ~ 06/13(화)도착',
    },
    {
      value: 1,
      label: '2023/06/13(화)출발 ~ 06/27(화)도착',
    },
    {
      value: 1,
      label: '2023/09/12(화)출발 ~ 09/13(화)도착',
    },
    {
      value: 1,
      label: '2023/09/26(화)출발 ~ 10/10(화)도착',
    },
  ];

  const SingleOption = [
    {
      value: 1,
      label: `1인 싱글룸 사용시 추가 ${formatPrice('540000')}`,
    },
  ];

  const dateSelect = (option: OnChangeValue<{ value: number; label: string }, false>) => {
    const optionDate = option?.label as string;
    const count = option?.value as number;

    if (items.some((item) => item.optionDate === optionDate)) {
      alert('이미 선택하신 옵션입니다.');
    } else {
      const newItem = {
        optionDate,
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
      setTotalPrice(totalPrice + 540000);
    } else {
      setSingle(option?.label as string);
      setSingleCount(option?.value as number);
      setTotalPrice(totalPrice + 540000);
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

  return (
    <DetailContent>
      <Simple>
        <Image src={tempData?.imagePath} alt="product image" width="525" height="525" />
        <TextContent>
          <h2>{tempData?.title}</h2>
          <p className="price">{formatPrice(tempData?.price)}</p>
          <p className="summary">{tempData?.summary}</p>
          <p className="title">여행 지역</p>
          <p className="detail">{tempData?.area}</p>
          <p className="title">여행 특징</p>
          <p className="detail">{tempData?.point}</p>
          <p className="title">여행 항공</p>
          <p className="detail">{tempData?.airline}</p>
          <p className="dropTitle">출발일</p>

          <Select
            onChange={dateSelect}
            options={DateOptions}
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
                    <p className="itemPrice">
                      {formatPrice(`${productPrice * itemCounts[i].count}`)}
                    </p>
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
                    setTotalPrice(totalPrice - 540000 * singleCount);
                    setSingle('');
                  }}
                />
              </p>
              <button
                onClick={() => {
                  if (singleCount > 1) {
                    setSingleCount(singleCount - 1);
                    setTotalPrice(totalPrice - 540000);
                  }
                }}
              >
                -
              </button>
              <p className="count">{singleCount}</p>
              <button
                onClick={() => {
                  setSingleCount(singleCount + 1);
                  setTotalPrice(totalPrice + 540000);
                }}
              >
                +
              </button>
              <p className="itemPrice">{formatPrice(`${540000 * singleCount}`)}</p>
            </ItemContent>
          ) : null}

          {items.length > 0 || single !== '' ? (
            <TotalContent>
              <p>총 상품금액 ( {totalMember} 명 )</p>
              <p className="totalPrice">{formatPrice(`${totalPrice}`)}</p>
            </TotalContent>
          ) : null}

          <button>예약하기</button>
          <button>관심상품</button>
          <button>
            <AiOutlineHeart />
          </button>
        </TextContent>
      </Simple>
    </DetailContent>
  );
};

export default ProductDetail;

const DetailContent = styled.div``;

const Simple = styled.div`
  display: flex;
  gap: 100px;
  justify-content: center;
`;

const TextContent = styled.div`
  width: 450px;
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
