// pages/_app.js
import React, { useState, useEffect, createContext } from 'react';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function MyApp({ Component, pageProps }) {
  const [mode, setMode] = useState('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setMode(savedTheme);
  }, []);

  const colorMode = {
    toggleColorMode: () => {
      setMode((prevMode) => {
        const newMode = prevMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newMode);
        return newMode;
      });
    },
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
      },
      secondary: {
        main: mode === 'light' ? '#dc004e' : '#f48fb1',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease',
          },
        },
      },
    },
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Head>
        <title>Tic Tac Toe</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}