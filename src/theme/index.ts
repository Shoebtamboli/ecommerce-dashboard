import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    tertiary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#66A5AD', // Light blue
      light: '#87b8be',
      dark: '#477379',
      contrastText: '#fff',
    },
    secondary: {
      main: '#C4DFE6', // Seafoam green
      light: '#d6e9ee',
      dark: '#899ca1',
      contrastText: '#2c484d',
    },
    tertiary: {
      main: '#C4DFE6',
      light: '#d6e9ee',
      dark: '#899ca1',
      contrastText: '#2c484d',
    },
    background: {
      default: '#f5f9fa',
      paper: '#fff',
    },
    text: {
      primary: '#2c484d',
      secondary: '#66A5AD',
    },
  },
});