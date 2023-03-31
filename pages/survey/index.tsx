import Image from '@/components/common/Image';
import { IProduct } from '@/interfaces/product';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductItem from '@/components/Product/ProductCard';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageTitle from '@/components/common/PageTitle';
import { COLORS } from '@/styles/colors';

const Servey = () => {
  const steps = ['질문1', '질문2', '질문3', '질문4'];
  const [answer, setAnswer] = useState<string[]>([]);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>답변 완료</Typography> */}
          <SurveyCard>
            <SurveyText>혼자 여행도 마다하지 않는 인싸 유형</SurveyText>
          </SurveyCard>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>다시하기</Button>
          </Box>
        </>
      ) : (
        <>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <CardContainer onClick={handleNext}>
            <SurveyCard>
              <SurveyText>나는 내향형이다.</SurveyText>
            </SurveyCard>
            <SurveyCard>
              <SurveyText>나는 외향형이다.</SurveyText>
            </SurveyCard>
          </CardContainer>
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              뒤로
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? '완료' : '다음'}
            </Button>
          </Box> */}
        </>
      )}
    </Container>
  );
};

export default Servey;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 16px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SurveyCard = styled.div`
  width: 100%;
  height: 400px;
  background-color: #e7f7fe;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 576px) {
    height: 200px;
  }
`;

const SurveyText = styled.p`
  color: ${COLORS.primary};
  font-size: 20px;
`;
