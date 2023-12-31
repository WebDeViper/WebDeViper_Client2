import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import StudyPage from './pages/StudyPage';
import RankingPage from './pages/RankingPage';
// import SettingPage from './pages/SettingPage';
import NoticePage from './pages/Notice/NoticePage';
// import LoginPage from './pages/LoginPage';
import DetailNoticePage from './pages/Notice/DetailNoticePage';
import KakaoPage from './pages/OauthPage/KakaoPage';
import NaverPage from './pages/OauthPage/NaverPage';
import GooglePage from './pages/OauthPage/GooglePage';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/dist';
import { authUser } from './reducers/thunkFunctions';
import { useEffect } from 'react';
// import NotAuthRoutes from './components/NotAuthRoutes';
// import ProtectedRoutes from './components/ProtectedRoutes';
import PageNotFound from './pages/404Page';
import SignInPage from './pages/SignInPage';
import CalendarPage from './pages/CalendarPage';
import CreateGroupPage from './pages/CreateGroupPage';
import ChatPage from './pages/ChatPage';
import DetailGroupPage from './pages/DetailGroupPage';
import MyPage from './pages/MyPage';
import TimerPage from './pages/TimerPage';
import MainPage from './pages/MainPage';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const category = useSelector(state => state.user?.userInfo.category);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      {/* 로그인한 사람은 갈 수 없는 경로 */}
      {/* <Route element={<NotAuthRoutes isAuth={isAuth} />}>
        <Route path="/login" element={<LoginPage isAuth={isAuth} />} />
      </Route> */}
      <Route path="/" element={<Layout category={category} />}>
        {/* 로그인 된 상태에서 접속 가능한 페이지 */}
        {/* <Route element={<ProtectedRoutes isAuth={isAuth} />}> */}
        {/* <Route index element={category ? <MainPage /> : <SignInPage />} /> */}
        <Route index element={<MainPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/notice/:noticeId" element={<DetailNoticePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/myPage" element={<MyPage />} />
        {/* <Route path="/setting" element={<SettingPage />} /> */}
        <Route path="/group/create" element={<CreateGroupPage />} />
        <Route path="/group/chat/:groupId/" element={<ChatPage />} />
        <Route path="/group/:groupId" element={<DetailGroupPage />} />
        {/* </Route> */}

        <Route path="/oauth/kakao" element={<KakaoPage />} />
        <Route path="/oauth/google" element={<GooglePage />} />
        <Route path="/oauth/naver" element={<NaverPage />} />
      </Route>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
