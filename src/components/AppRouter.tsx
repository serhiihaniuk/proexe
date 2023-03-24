import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from 'src/pages/main/MainPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default AppRouter;
