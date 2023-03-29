import React from 'react';
import { Global, css } from '@emotion/react';
import reset from 'emotion-reset';

const style = css`
  ${reset}

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
      format('woff');
    font-weight: 400;
    font-style: normal;
  }

  body {
    font-family: 'Pretendard-Regular', sans-serif;
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  .react-datepicker__tab-loop {
    position: absolute;
    top: 0;
  }

  .react-datepicker__triangle {
    display: none !important;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
