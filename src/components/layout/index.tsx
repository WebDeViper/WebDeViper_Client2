import { Outlet } from 'react-router-dom';
import Header from './Header';
import Main from './Main';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen justify-center align-middle">
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}
