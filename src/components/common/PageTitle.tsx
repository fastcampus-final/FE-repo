import React from 'react';
import styled from '@emotion/styled';

interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return <StyledTitle>{title}</StyledTitle>;
};

export default PageTitle;

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  padding: 10px 0 20px 0;
`;
