import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ isAuth, category }) => {
  console.log('ProtectedRoutes isAuth, category>>', isAuth, category);

  // 로그인 안 된 사용자는 login 페이지로 리다이렉트
  if (!isAuth) return <Navigate to={'/login'} />;
  return category ? <Outlet /> : <Navigate to={'/category'} />;
};

export default ProtectedRoutes;
