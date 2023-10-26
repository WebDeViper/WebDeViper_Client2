import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import MainPage from './pages/MainPage';
import RankingPage from './pages/RankingPage';
import SettingPage from './pages/SettingPage';
import NoticePage from './pages/NoticePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />

        <Route path="/notice" element={<NoticePage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
