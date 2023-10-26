import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
// import Redirection from './pages/LoginPage/Redirection';

function App() {
  // const isAuthorized: boolean = true;
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/login/api/callback" element={<Redirection />} /> */}
      {/* <Route path="/login/api/callback:code" element={<Redirection />} /> */}
      <Route path="/" element={<Layout />}>
        {/* {!isAuthorized ? < to='/login'></>} */}
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default App;
