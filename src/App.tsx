import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import MainPage from './pages/MainPage';
import RankingPage from './pages/RankingPage';
import SettingPage from './pages/SettingPage';
import NoticePage from './pages/NoticePage';
import LoginPage from './pages/LoginPage';
import DetailNoticePage from './pages/DetailNoticePage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/notice/:noticeId" element={<DetailNoticePage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
