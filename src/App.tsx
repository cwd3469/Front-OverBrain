import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TutorialsPage from './pages/TutorialsPage';
import MainLayout from './pages/layout/MainLayout';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<MainLayout width="1028px" />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
