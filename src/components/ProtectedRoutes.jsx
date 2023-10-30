import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ isAuth, category }) => {
  console.log('ProtectedRoutes isAuth, category>>', isAuth, category);
  // 로그인 안 된 사용자는 login 페이지로 리다이렉트
  if (!isAuth) return <Navigate to={'/login'} />;
  else if (!category) return <Navigate to={'/category'} />;
  else return <Outlet />;
  // 로그인 되어있지만 카테고리 값 없으면 category 선택 페이지로
  // return category ? <Outlet /> : <Navigate to={'/category'} />;
};

export default ProtectedRoutes;
