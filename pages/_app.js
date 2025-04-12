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
        <title>Tic Tac Toe - Play Classic XO Game Online</title>
        <meta name="title" content="Tic Tac Toe - Play Classic XO Game Online" />
        <link rel="icon" href="/faav.png" />
        <meta name="description" content="Play the classic Tic Tac Toe game online with adjustable board sizes and custom rules. Challenge the computer or play with friends in this modern implementation of the timeless strategy game." />
        <meta name="keywords" content="tic tac toe, XO game, noughts and crosses, strategy game, online game, board game, puzzle game" />
        <meta name="author" content="Your Name" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/" />
        <meta property="og:title" content="Tic Tac Toe - Play Classic XO Game Online" />
        <meta property="og:description" content="Modern implementation of the classic Tic Tac Toe game with adjustable board sizes and custom rules." />
        <meta property="og:image" content="https://your-domain.com/Demo.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://your-domain.com/" />
        <meta property="twitter:title" content="Tic Tac Toe - Play Classic XO Game Online" />
        <meta property="twitter:description" content="Modern implementation of the classic Tic Tac Toe game with adjustable board sizes and custom rules." />
        <meta property="twitter:image" content="https://your-domain.com/Demo.png" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={mode === 'light' ? 'light-bg' : 'dark-bg'}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
