// 모달 개념 으로 만들기
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useState } from 'react';

export default function LoginModal({setIsOpen}): React.ReactElement {
  const [isOpen: boolean, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen)
  }
  const navigate = useNavigate();
  // const KAKAO_REST_API_KEY: string = import.meta.env.VITE_KAKAO_REST_API_KEY;
  // const GOOGLE_REST_API_KEY: string = import.meta.env.VITE_GOOGLE_REST_API_KEY;
  // const REDIRECT_URI: string = import.meta.env.VITE_REDIRECT_URI;
  // console.log(GOOGLE_REST_API_KEY);
  // const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // const googleLink = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email profile`;

  // 여기서 url은 백에서 제공하는 url
  const loginHandler = (url: string) => {
    navigate(url);
  };

  return (
    <div className="m-auto w-2/5 p-7 grid grid-rows-3 grid-cols-3 gap-4 items-center rounded-xl border shadow-md bg-semi_primary">
      <h1 className="text-center font-bold text-2xl col-span-3">로그인</h1>
      <button onClick={openModalHandler}>X</button>
      <button
        className="col-span-3 flex items-center bg-kakao text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg"
        onClick={() => loginHandler('/login/kakao')}
      >
        <RiKakaoTalkFill />
        <span className="ms-3">카카오 로그인</span>
      </button>
      <button
        className="col-span-3 flex items-center bg-google text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg"
        onClick={() => loginHandler('/login/google')}
      >
        <FcGoogle />
        <span className="ms-3">구글 로그인</span>
      </button>
      <button
        className="col-span-3 flex items-center bg-naver text-light text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg"
        onClick={() => loginHandler('/login/naver')}
      >
        <SiNaver />
        <span className="ms-3">네이버 로그인</span>
      </button>
      <Button customStyle="row-span-1/4 col-start-3 mt-3 bg-light text-primary border-primary border-2">
        <Link to="/">메인으로 이동</Link>
      </Button>
    </div>
  );
}


{/* <div className="m-auto w-2/5 p-7 grid grid-rows-3 grid-cols-3 gap-4 items-center rounded-xl border shadow-md bg-semi_primary">
      <h1 className="text-center font-bold text-2xl col-span-3">로그인</h1>
      <button
        className="col-span-3 flex items-center bg-kakao text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg"
        onClick={() => loginHandler('/login/kakao')}
      >
        <RiKakaoTalkFill />
        <span className="ms-3">카카오 로그인</span>
      </button>
      <button
        className="col-span-3 flex items-center bg-google text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg"
        onClick={() => loginHandler('/login/google')}
      >
        <FcGoogle />
        <span className="ms-3">구글 로그인</span>
      </button>
      <button
        className="col-span-3 flex items-center bg-naver text-light text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg"
        onClick={() => loginHandler('/login/naver')}
      >
        <SiNaver />
        <span className="ms-3">네이버 로그인</span>
      </button>
      <Button customStyle="row-span-1/4 col-start-3 mt-3 bg-light text-primary border-primary border-2">
        <Link to="/">메인으로 이동</Link>
      </Button>
    </div> */}