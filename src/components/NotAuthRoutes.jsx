import { Navigate, Outlet } from 'react-router-dom';

const NotAuthRoutes = ({ isAuth }) => {
  console.log(isAuth, 'isAuth');
  return isAuth ? <Outlet /> : <Navigate to={'/'} />;
};

export default NotAuthRoutes;
