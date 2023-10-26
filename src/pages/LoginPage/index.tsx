import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';

export default function LoginPage() {
  // 카카오 설정에서 redirect uri 를 백쪽으로 설정해야함
  const REST_API_KEY = '556e2ccdb544d3551ffe0ec46ba303c2';
  const REDIRECT_URI = 'http://localhost:5173/kakao/callback';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <div className="m-auto w-2/5 p-7 grid grid-rows-3 grid-cols-1 gap-4 items-center rounded-xl border shadow-md">
      <h1 className="text-center font-bold text-2xl">로그인</h1>
      <button
        className="basis-1 flex items-center bg-kakao text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg"
        onClick={loginHandler}
      >
        <RiKakaoTalkFill />
        <span className="ms-3">카카오 로그인</span>
      </button>
      <button className="basis-1 flex items-center bg-google text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg">
        <FcGoogle />
        <span className="ms-3">구글 로그인</span>
      </button>
      <button className="basis-1 flex items-center bg-naver text-light text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg">
        <SiNaver />
        <span className="ms-3">네이버 로그인</span>
      </button>
    </div>
  );
}
