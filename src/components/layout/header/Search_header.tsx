import React from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { ROUTES } from '@/constants/routes';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

const Search = () => {
  return (
    <div>
      <Link href={ROUTES.SEARCH}>
        <TextField size="small" />
        <Button>
          <SearchIcon />
        </Button>
      </Link>
    </div>
  );
};

export default Search;
