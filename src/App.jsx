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
import { useLocation, useNavigate } from 'react-router-dom/dist';
import { authUser } from './reducers/thunkFunctions';
import { useEffect } from 'react';
import NotAuthRoutes from './components/NotAuthRoutes';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    } else {
      // navigate('/login');
    }
  }, [isAuth, pathname, dispatch, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage isAuth={isAuth} />} />

      <Route path="/" element={<Layout />}>
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
