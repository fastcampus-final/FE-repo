import { DefaultTheme } from 'styled-components';

const colors = {
  primary: '#4581f8',
  secondary: '#4581f8cf',
  white: '#fff',
  black: '#000',
  gray: 'rgba(128, 128, 128, 0.2)',
  lightgray: 'rgba(128, 128, 128, 0.14)',
};

const shadow = {
  boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.2), -1px -1px 4px rgba(0, 0, 0, 0.2)',
};

const media = {
  mobile: `(max-width: 576px)`,
};

const theme: DefaultTheme = {
  colors,
  shadow,
  media,
};

export default theme;
