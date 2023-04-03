import React from 'react';
import { Global, css } from '@emotion/react';
import reset from 'emotion-reset';

const style = css`
  ${reset}

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.eot?#iefix')
        format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.woff2')
        format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.woff')
        format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.ttf')
        format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.eot?#iefix')
        format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.woff2')
        format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.woff')
        format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.ttf')
        format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.eot?#iefix')
        format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.woff2')
        format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.woff')
        format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.ttf')
        format('truetype');
    font-display: swap;
  }

  body {
    font-family: 'Pretendard', sans-serif;
    list-style: none;
    color: #101010;
    font-size: 16px;
    @media (max-width: 1200px) {
      font-size: 14px;
    }
  }

  a {
    text-decoration: none;
    color: #101010;
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
