import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import Redirection from './pages/LoginPage/Redirection';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/kakao/callback" element={<Redirection />} />
        <Route path="/kakao/callback:code" element={<Redirection />} />
      </Route>
    </Routes>
  );
}

export default App;
