import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import SigninPage from '@/pages/SigninPage';
import BoardPage from '@/pages/BoardPage';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import TutorialsPage from './pages/TutorialsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/tutorials',
    element: <TutorialsPage />,
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
