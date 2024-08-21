import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/reset.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './app/styles/theme';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
