import { Outlet } from 'react-router-dom';
import Header from './Header';
import Main from './Main';

export default function Layout() {
  return (
    <div className="container mx-auto">
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}
