import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MainLayout from './pages/layout/MainLayout';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
