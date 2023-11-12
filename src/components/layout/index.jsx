import { Outlet } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default function Layout({ category }) {
  return (
    <div className="container mx-auto h-screen flex flex-col">
      {category ? <Header /> : ''}
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
}
