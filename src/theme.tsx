import { createTheme } from '@mui/material/styles';
import createBreakpoints from '@mui/system/createTheme/createBreakpoints';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    button: React.CSSProperties;
    cardBig: React.CSSProperties;
    cardSmall: React.CSSProperties;
    tempBig: React.CSSProperties;
    tempSmall: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    button?: React.CSSProperties;
    cardBig?: React.CSSProperties;
    cardSmall?: React.CSSProperties;
    tempBig?: React.CSSProperties;
    tempSmall?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    button: true;
    cardBig: true;
    cardSmall: true;
    tempBig: true;
    tempSmall: true;
    h1: false;
    h2: false;
    h3: false;
  }
}

const breakpoints = createBreakpoints({});
const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    button: {
      fontSize: '2.8rem',
      fontFamily: '"Lato", sans-serif',
      [breakpoints.down('md')]: {
        fontSize: '2.2rem',
        lineHeight: '1.2',
      },
    },
    tempBig: {
      fontSize: '8.6rem',
      fontFamily: '"Teko", sans-serif',
      lineHeight: '0.8',
      color: '#333338',
      [breakpoints.down('sm')]: {
        fontSize: '6rem',
      },
    },
    tempSmall: {
      fontSize: '3.6rem',
      fontFamily: '"Teko", sans-serif',
      lineHeight: '0.8',
      color: '#333338',
      [breakpoints.down('sm')]: {
        fontSize: '3rem',
      },
    },
    cardBig: {
      fontSize: '2.6rem',
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 100,
      color: '#333338',
      [breakpoints.down('sm')]: {
        fontSize: '2.2rem',
      },
    },
    cardSmall: {
      fontSize: '2rem',
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 100,
      color: '#333338',
      [breakpoints.down('sm')]: {
        fontSize: '1.8rem',
      },
    },
  },
});

export default theme;
