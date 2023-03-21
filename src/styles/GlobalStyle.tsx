import React from 'react';
import { Global, css } from '@emotion/react';
import reset from 'emotion-reset';

const style = css`
  ${reset}

  @font-face {
    font-family: 'Noto Sans KR';
    src: url('http://fonts.googleapis.com/earlyaccess/notosanskr.css') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
