import { Navigate, Route, Routes } from 'react-router-dom';
import UserProfilePage from 'src/pages/UserProfile/UserProfilePage';
import MainPage from 'src/pages/main/MainPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default AppRouter;
