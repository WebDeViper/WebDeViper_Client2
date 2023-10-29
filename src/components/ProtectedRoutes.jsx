import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ isAuth }) => {
  // 로그인 안 된 사용자는 login 페이지로 리다이렉트
  return isAuth ? <Outlet /> : <Navigate to={'/login'} />;
};

export default ProtectedRoutes;
