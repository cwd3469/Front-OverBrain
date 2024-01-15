import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/reset.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import SigninPage from '@/pages/SigninPage';
import BoardPage from '@/pages/BoardPage';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/signin',
    element: <SigninPage />,
  },
  {
    path: '/board',
    element: <BoardPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
