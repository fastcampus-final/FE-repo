import React from 'react';
import styled from '@emotion/styled';

interface Props {
  title: string;
  fontSize?: string;
  padding?: string;
}

const PageTitle = ({ title, fontSize = '20px', padding = '10px 0 20px 0' }: Props) => {
  return (
    <StyledTitle fontSize={fontSize} padding={padding}>
      <p>{title}</p>
    </StyledTitle>
  );
};

export default PageTitle;

const StyledTitle = styled.h1<{ fontSize: string; padding: string }>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 600;
  padding: ${({ padding }) => padding};
  margin: 0;
  width: 100%;
  @media (max-width: 1200px) {
    margin: 0 auto;
  }
`;
