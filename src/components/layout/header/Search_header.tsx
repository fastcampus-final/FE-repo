import React from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { ROUTES } from '@/constants/routes';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';

const Search = () => {
  return (
    <div>
      <Link href={ROUTES.SEARCH}>
        <TextContainer>
          <TextField size="small" />
        </TextContainer>
        <Button>
          <SearchIcon />
        </Button>
      </Link>
    </div>
  );
};

export default Search;

const TextContainer = styled.span`
  @media (max-width: 1200px) {
    display: none;
  }
`;
