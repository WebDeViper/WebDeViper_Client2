import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import MainPage from './pages/MainPage';
import RankingPage from './pages/RankingPage';
import SettingPage from './pages/SettingPage';
import NoticePage from './pages/NoticePage';
import LoginPage from './pages/LoginPage';
import DetailNoticePage from './pages/DetailNoticePage';
import KakaoPage from './pages/OauthPage/KakaoPage';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/dist';
import { authUser } from './reducers/thunkFunctions';
import { useEffect } from 'react';
import NotAuthRoutes from './components/NotAuthRoutes';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      {/* 로그인한 사람은 갈 수 없는 경로 */}
      <Route element={<NotAuthRoutes isAuth={isAuth} />}>
        <Route path="/login" element={<LoginPage isAuth={isAuth} />} />
      </Route>
      <Route path="/" element={<Layout />}>
        {/* 로그인 된 상태에서 접속 가능한 페이지 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route index element={<MainPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/notice/:noticeId" element={<DetailNoticePage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Route>

        <Route path="/oauth/kakao" element={<KakaoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
