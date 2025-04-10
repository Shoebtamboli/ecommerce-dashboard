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
      main: '#B85042', // Terracotta red
      light: '#c97666',
      dark: '#80382e',
      contrastText: '#fff',
    },
    secondary: {
      main: '#A7BEAE', // Muted teal
      light: '#bccec2',
      dark: '#748579',
      contrastText: '#000',
    },
    tertiary: {
      main: '#E7E8D1', // Light beige
      light: '#f4f5e6',
      dark: '#a1a292',
      contrastText: '#000',
    },
    background: {
      default: '#E7E8D1', // Light beige
      paper: '#fff',
    },
  },
});