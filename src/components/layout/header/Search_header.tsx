import React from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { ROUTES } from '@/constants/routes';
import Button from '@mui/material/Button';

const Search = () => {
  return (
    <div>
      <Link href={ROUTES.SEARCH}>
        <input type="text" />
        <Button>
          <SearchIcon />
        </Button>
      </Link>
    </div>
  );
};

export default Search;
