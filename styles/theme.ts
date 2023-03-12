import { DefaultTheme } from 'styled-components';

const colors = {
  primary: '#0055b8',
  secondary: '#0a4297',
  white: '#fff',
  black: '#000',
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
