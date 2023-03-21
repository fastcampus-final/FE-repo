import React from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { ROUTES } from '@/constants/routes';

const Search = () => {
  return (
    <div>
      <Link href={ROUTES.SEARCH}>
        <input type="text" />
        <button type="button">
          <SearchIcon />
        </button>
      </Link>
    </div>
  );
};

export default Search;
