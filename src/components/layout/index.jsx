import { Outlet } from 'react-router-dom';
import Header from './Header';
import Main from './Main';

export default function Layout({ category }) {
  return (
    <div className="container mx-auto h-screen">
      {category ? <Header /> : ''}
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}
