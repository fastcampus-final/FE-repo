import Button from '@/components/common/Button';
import Image from '@/components/common/Image';
import { IProduct } from '@/interfaces/product';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductItem from '@/components/Product';

const tempData: IProduct[] = [
  {
    productId: '1',
    title: '호주 시드니 8일',
    price: '2699000',
    imagePath: 'https://picsum.photos/id/10/350/350',
  },
  {
    productId: '2',
    title: '다낭 골프팩 3박 5일',
    price: '1000000',
    imagePath: 'https://picsum.photos/id/20/350/350',
  },
  {
    productId: '3',
    title: '나고야 골프팩 4일',
    price: '1863000',
    imagePath: 'https://picsum.photos/id/30/350/350',
  },
  {
    productId: '4',
    title: '오카야마 4일',
    price: '999000',
    imagePath: 'https://picsum.photos/id/40/350/350',
  },
  {
    productId: '5',
    title: '광저우 5일',
    price: '729000',
    imagePath: 'https://picsum.photos/id/50/350/350',
  },
  {
    productId: '6',
    title: '미서부 9일 (모두투어)',
    price: '1890000',
    imagePath: 'https://picsum.photos/id/60/350/350',
  },
  {
    productId: '7',
    title: '사이판 월드 리조트 5일 (모두투어)',
    price: '1269000',
    imagePath: 'https://picsum.photos/id/70/350/350',
  },
  {
    productId: '8',
    title: '까미노 성지순례 11일',
    price: '2290000',
    imagePath: 'https://picsum.photos/id/80/350/350',
  },
];

const Servey = () => {
  const [answer, setAnswer] = useState<string[]>([]);

  const handleClickAnswer = (answerNum: string) => {
    setAnswer((prev) => prev.concat(answerNum));
  };

  return (
    <Container>
      <QuestionMessage>
        <Image src="./logo.png" alt="고투게더" width="30px" borderRadius="30px" />
        <TextBubble>
          <p>안녕하세요. 여행 유형 테스트를 시작합니다.</p>
        </TextBubble>
      </QuestionMessage>
      <QuestionMessage>
        <Image src="./logo.png" alt="고투게더" width="30px" borderRadius="30px" />
        <TextBubble>
          <p>평소에 어떤 여행을 선호하시나요?</p>
          <AnswerList>
            <li>
              <Button
                variant="gray"
                width="100%"
                height="40px"
                borderRadius="6px"
                onClick={() => handleClickAnswer('1')}
              >
                도시 여행
              </Button>
            </li>
            <li>
              <Button variant="gray" width="100%" height="40px" borderRadius="6px">
                자연 여행
              </Button>
            </li>
          </AnswerList>
        </TextBubble>
      </QuestionMessage>
      <AnswerMessage>
        <TextBubble>
          <p>도시 여행</p>
        </TextBubble>
      </AnswerMessage>
      <QuestionMessage>
        <Image src="./logo.png" alt="고투게더" width="30px" borderRadius="30px" />
        <TextBubble>
          <p>여행지의 날씨는 어떤 게 더 좋으신가요?</p>
          <AnswerList>
            <li>
              <Button
                variant="gray"
                width="100%"
                height="40px"
                borderRadius="6px"
                onClick={() => handleClickAnswer('1')}
              >
                따듯한 날씨
              </Button>
            </li>
            <li>
              <Button variant="gray" width="100%" height="40px" borderRadius="6px">
                시원한 날씨
              </Button>
            </li>
          </AnswerList>
        </TextBubble>
      </QuestionMessage>
      <AnswerMessage>
        <TextBubble>
          <p>시원한 날씨</p>
        </TextBubble>
      </AnswerMessage>
      <QuestionMessage>
        <Image src="./logo.png" alt="고투게더" width="30px" borderRadius="30px" />
        <TextBubble>
          <p>고객님의 여행 유형은 &quot;시원한 도시&quot; 유형 입니다.</p>
          <p>마음에 꼭 드실 여행 상품을 추천해 드릴게요.</p>
        </TextBubble>
      </QuestionMessage>
      <div>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2000,
          }}
          navigation={true}
          pagination={{ clickable: true }}
        >
          {tempData.map((item: IProduct, idx: number) => (
            <SwiperSlide key={idx}>
              <ProductItem data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default Servey;

const Container = styled.div`
  margin: 0 auto;
  width: 800px;
  padding: 30px;
  background-color: #c2e1ff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const QuestionMessage = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-self: flex-start;
  gap: 14px;
`;

const AnswerMessage = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-self: flex-end;
  gap: 10px;
`;

const TextBubble = styled.div`
  background-color: white;
  width: fit-content;
  padding: 16px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
