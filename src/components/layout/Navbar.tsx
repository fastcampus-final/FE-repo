// import { ROUTES } from '@/constants/routes';
import React from 'react';
import styled from '@emotion/styled';
import { group } from '@/constants/navGroup';
import FlexGroup from './nav/FlexGroup';

const Navbar = () => {
  return (
    <Container>
      <div>
        <FlexUl>
          {group.map((flexGroup) => (
            <li key={flexGroup.title}>
              <FlexGroup flexgroup={flexGroup} />
            </li>
          ))}
        </FlexUl>
      </div>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const FlexUl = styled.ul`
  display: flex;
  margin: 0 auto;
  padding: 30px;
`;

const HoverUl = styled.ul`
  display: none;
`;
