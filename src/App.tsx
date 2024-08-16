import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TutorialsPage from './pages/TutorialsPage';
import MainLayout from './pages/layout/MainLayout';
import ToastContainer from './widgets/toast/ToastContainer';
import { Path } from './utils/constants/path';

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route element={<MainLayout width="1028px" />}>
            <Route path={Path.ROOT} element={<MainPage />} />
            <Route path={Path.TUTORIALS} element={<TutorialsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
