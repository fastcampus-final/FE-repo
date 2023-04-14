import { IProduct } from '@/interfaces/product';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import PageTitle from '@/components/common/PageTitle';
import { COLORS } from '@/styles/colors';
import Beach from '@/../public/icons/survey/Beach.svg';
import Dish from '@/../public/icons/survey/Dish.svg';
import Diving from '@/../public/icons/survey/Diving.svg';
import Flex from '@/../public/icons/survey/Flex.svg';
import Rice from '@/../public/icons/survey/Rice.svg';
import Saving from '@/../public/icons/survey/Saving.svg';
import UserMinus from '@/../public/icons/survey/UserMinus.svg';
import UserPlus from '@/../public/icons/survey/UserPlus.svg';
import { patchUserType } from '@/apis/user';
import { getProductByType } from '@/apis/product';
import SurveyProductCard from '@/components/Product/SurveyProductCard';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';
import withAuth from '@/components/common/PrivateRouter';
import { formatMbtiToText } from '@/utils/format';
import { isMobile } from 'react-device-detect';

const Servey = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<IProduct[]>([]);
  const [isSelected, setIsSelected] = useState({ 1: false, 2: false });
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    `이어지는 네 번의 선택이\n즐거운 여행의 동반자를 찾는데 도움이 됩니다.`,
    `두 번째 선택입니다.\n이번 여행의 목적과 가까운 것을 골라보세요.`,
    `절반을 지났네요.\n이번엔 소비패턴 또는 이번 여행의 경비와 연관이 있을까요?`,
    `먹는 것도 중요하죠!\n마지막 선택은 바로 즐거운 식시시간 관련입니다.`,
  ];
  const [answer, setAnswer] = useState<string[]>([]);
  const [question, setQuestion] = useState([
    {
      1: { text: '나는 내향형이다.', icon: <UserMinus />, value: 'I' },
      2: { text: '나는 외향형이다.', icon: <UserPlus />, value: 'E' },
    },
    {
      1: { text: '휴식과 여유있는 여행이 좋다.', icon: <Beach />, value: 'N' },
      2: { text: '다양한 활동과 체험이 좋다.', icon: <Diving />, value: 'S' },
    },
    {
      1: { text: '모처럼 여행이니 맘 먹고 써도 좋다.', icon: <Flex />, value: 'F' },
      2: { text: '적당한 비용으로도 충분히 즐길 수 있다.', icon: <Saving />, value: 'T' },
    },
    {
      1: { text: '하루 한 끼 한식이 필요해!', icon: <Rice />, value: 'J' },
      2: { text: '여행인데 현지인 입맛을 따라야지!', icon: <Dish />, value: 'P' },
    },
  ]);

  useEffect(() => {
    if (activeStep === steps.length) {
      handleUserType();
    }
  }, [activeStep]);

  const handleNext = async (value: string) => {
    if (!isSelected[1] && !isSelected[2]) {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.SURVEY.CHECK_ANSWER,
        }),
      );
    }

    setAnswer((prev) => prev.concat(value));
    setIsSelected({ 1: false, 2: false });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleUserType = async () => {
    try {
      const type = answer.join('');
      const reqData = { userType: type };
      await patchUserType(reqData);

      const data = await getProductByType();
      setProduct(data);
    } catch {
      return dispatch(
        setModal({
          isOpen: true,
          text: MESSAGES.SURVEY.ERROR_GET_PRODUCT,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
        }),
      );
    }
  };

  const handleBack = () => {
    setAnswer((prev) => prev.slice(0, -1));
    setIsSelected({ 1: false, 2: false });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setAnswer([]);
    setIsSelected({ 1: false, 2: false });
    setActiveStep(0);
  };

  const handleClickFirst = () => {
    setIsSelected({ 1: true, 2: false });
  };

  const handleClickSecond = () => {
    setIsSelected({ 1: false, 2: true });
  };

  return (
    <Container>
      <PageTitle title="여행 유형 테스트" />
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps} />
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <CardContainer>
          <TypeText>{formatMbtiToText(answer.join(''))}</TypeText>
          <SurveyCard>
            <SurveyText>
              {`고투게더가 추천해 드리는 상품들을 살펴보시고,\n여행 계획을 세워보세요.`}
            </SurveyText>
            <ProductWrap>
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={10}
                slidesPerView={isMobile ? 2 : 3}
                loop={true}
                autoplay={{
                  delay: 2000,
                }}
                speed={1000}
                navigation={true}
                pagination={{ clickable: true }}
              >
                {product.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <SurveyProductCard data={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </ProductWrap>
          </SurveyCard>
          <Button onClick={handleReset}>다시하기</Button>
        </CardContainer>
      ) : (
        <CardContainer>
          <QuestionText>{steps[activeStep]}</QuestionText>
          <CardWrap>
            <SurveyCard isSelected={isSelected[1]} onClick={handleClickFirst}>
              {question[activeStep][1]['icon']}
              <SurveyText>{question[activeStep][1]['text']}</SurveyText>
            </SurveyCard>
            <SurveyCard isSelected={isSelected[2]} onClick={handleClickSecond}>
              {question[activeStep][2]['icon']}
              <SurveyText>{question[activeStep][2]['text']}</SurveyText>
            </SurveyCard>
          </CardWrap>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              뒤로가기
            </Button>
            <Button
              onClick={() =>
                handleNext(
                  isSelected['1']
                    ? question[activeStep][1]['value']
                    : question[activeStep][2]['value'],
                )
              }
            >
              {activeStep === steps.length - 1 ? '완료' : '다음'}
            </Button>
          </Box>
        </CardContainer>
      )}
    </Container>
  );
};

export default withAuth(Servey);

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 16px 0;
  @media (max-width: 1200px) {
    padding: 16px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const CardWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  cursor: pointer;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const SurveyCard = styled.div<{ isSelected?: boolean }>`
  width: 100%;
  min-height: 400px;
  padding: 30px;
  background-color: #e7f7fe;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  color: ${COLORS.primary};
  justify-content: center;
  box-sizing: border-box;
  border-radius: 10px;
  border: ${(props) => (props.isSelected ? `3px solid ${COLORS.primary}` : '')};
  @media (max-width: 1200px) {
    min-height: 200px;
    padding: 20px;
  }
`;

const SurveyText = styled.p`
  color: ${COLORS.primary};
  font-size: 20px;
  line-height: 1.6;
  text-align: center;
  white-space: pre-wrap;
  @media (max-width: 1200px) {
    font-size: 16px;
  }
`;

const QuestionText = styled.p`
  text-align: center;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const TypeText = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const ProductWrap = styled.div`
  width: 1000px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  @media (max-width: 1200px) {
    width: 80vw;
  }
`;
