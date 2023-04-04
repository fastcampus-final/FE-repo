import { createTheme } from '@mui/material';

const palette = {
  primary: {
    main: '#0CB1F3',
    contrastText: '#fff',
    dark: '#0ba5e2',
  },
  secondary: {
    main: '#F84A24',
  },
};

export const theme = createTheme({
  palette,
  typography: {
    fontFamily: 'Pretendard',
    fontSize: 14,
  },
});
