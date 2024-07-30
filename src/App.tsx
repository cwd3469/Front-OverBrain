import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MainLayout from './pages/layout/MainLayout';
import ButtonDesign from './pages/design/ButtonDesign';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route path="/design">
          <Route path="button" element={<ButtonDesign />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
