import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Noto Sans KR';
    src: url('http://fonts.googleapis.com/earlyaccess/notosanskr.css')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    list-style: none;
  }
`;
export default GlobalStyle;
