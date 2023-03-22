import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Image from '@/../../src/components/common/Image';
import { IDetail } from '@/interfaces/product';
import { formatPrice } from '@/utils/format';
import { AiOutlineHeart } from 'react-icons/ai';

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

const ProductDetail = () => {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [single, setSingle] = useState('');
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState(1);

  const dateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDate(e.target.value);

    const newItem = {
      date,
      counts,
    };
    setItems([newItem as never, ...items]);
  };
  console.log(items);

  const singleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSingle(e.target.value);
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
          <select onChange={dateSelect}>
            <option selected disabled hidden>
              출발일을 선택해 주세요 (필수)
            </option>
            <option value="2023/05/30(화)출발 ~ 06/13(화)도착">
              2023/05/30(화)출발 ~ 06/13(화)도착
            </option>
            <option value="2023/06/13(화)출발 ~ 06/27(화)도착">
              2023/06/13(화)출발 ~ 06/27(화)도착
            </option>
            <option value="2023/09/12(화)출발 ~ 09/13(화)도착">
              2023/09/12(화)출발 ~ 09/13(화)도착
            </option>
            <option value="2023/09/26(화)출발 ~ 10/10(화)도착">
              2023/09/26(화)출발 ~ 10/10(화)도착
            </option>
          </select>

          <p className="dropTitle">싱글차지</p>
          <select onChange={singleSelect}>
            <option selected hidden disabled>
              싱글룸을 이용하려면 선택해 주세요 (선택)
            </option>
            <option value="1인 싱글룸 사용시 추가">
              1인 싱글룸 사용시 추가 {formatPrice('540000')}
            </option>
          </select>

          {items.length > 0
            ? items.map((item: { date: string; counts: number }, i: React.Key) => {
                return (
                  <ItemContent key={i}>
                    <p className="itemTitle">{item?.date}</p>
                    <button
                      onClick={() => {
                        if (counts > 1) {
                          item.counts - 1;
                        }
                      }}
                    >
                      -
                    </button>
                    <p>{item.counts}</p>
                    <button
                      onClick={() => {
                        // item.counts + 1;
                        setCounts(counts + 1);
                      }}
                    >
                      +
                    </button>
                    <p>{formatPrice(tempData.price)}</p>
                  </ItemContent>
                );
              })
            : null}

          {single !== '' ? (
            <ItemContent>
              <p>{single}</p>
              <p>{formatPrice('540000')}</p>
            </ItemContent>
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
  select,
  input {
    width: 100%;
    font-size: 1rem;
    padding: 10px;
  }
`;

const ItemContent = styled.div`
  margin-top: 24px;
  .itemTitle {
    border-bottom: 1px solid #999;
  }
`;
