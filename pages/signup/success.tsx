import React from 'react';
import { ROUTES } from '@/constants/routes';
import { MESSAGES } from '@/constants/messages';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PageTitle from '@/components/common/PageTitle';
import styled from '@emotion/styled';

const success = () => {
  const router = useRouter();

  return (
    <div>
      <div>
        <Title>
          <PageTitle title="회원가입" />
        </Title>
        <TitleText>회원으로 고투게더의 다양한 여행을 만나보세요</TitleText>
      </div>
      <ContentWrap>
        <ContentTitle>회원가입이 완료되었습니다</ContentTitle>
        <Content>
          <Email>{router.query.email}</Email>으로
          <br />
          회원가입이 완료되었습니다
        </Content>
      </ContentWrap>
      <Center>
        <Button
          onClick={() => {
            router.push('/');
          }}
        >
          완료
        </Button>
      </Center>
    </div>
  );
};

export default success;

const TitleText = styled.div`
  padding: 25px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #585858;
`;
const ContentWrap = styled.div`
  margin: 30px auto;
  background-color: #f7f7f7;
  border-radius: 8px;
  width: 335px;
  height: 140px;
  box-sizing: border-box;
  padding: 30px 60px;
`;
const Title = styled.div`
  width: fit-content;
  margin: 0 auto;
`;
const ContentTitle = styled.p`
  display: flex;
  justify-content: center;
  font-size: 20px;
  color: #0cb1f3;
  padding-bottom: 20px;
`;
const Content = styled.p`
  text-align: center;
  line-height: 25px;
`;
const Email = styled.span`
  color: #0cb1f3;
`;
const Button = styled.button`
  margin-top: 230px;
  width: 335px;
  height: 44px;
  border-radius: 8px;
  background-color: #0cb1f3;
  color: white;
  font-weight: bold;
  box-sizing: border-box;
  border: 0;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
`;
