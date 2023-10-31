// 모달 개념 으로 만들기
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import Button from '../../components/common/Button';
import CustomModal from '../../components/common/CustomModal';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LoginModal({ isOpen, close }) {
  const navigate = useNavigate();

  // API & Redirect URI
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const KAKAO_LOGIN_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // style
  const kakaoColor = '#FEE500';
  const googleColor = '#fefefe';
  const naverColor = '#2DB400';
  const kakaoStyle = `col-span-3 flex items-center text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg bg-[${kakaoColor}]`;
  const googleStyle = `col-span-3 flex items-center text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg bg-[${googleColor}]`;
  const naverStyle = `col-span-3 flex items-center text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg bg-[${naverColor}]`;

  const handleNavigate = uri => {
    navigate(uri);
  };

  return (
    <CustomModal isOpen={isOpen} close={close}>
      <div className="px-10 py-14">
        <h1 className="text-center font-bold text-2xl col-span-3 mb-8">로그인</h1>
        <div className="mb-5">
          <Button handleClick={() => handleNavigate(`${KAKAO_LOGIN_URI}`)} customStyle={kakaoStyle}>
            <RiKakaoTalkFill />
            <span className="ms-3">카카오 로그인</span>
          </Button>
          <button className={googleStyle} onClick={() => handleLogin('google')}>
            <FcGoogle />
            <span className="ms-3">구글 로그인</span>
          </button>
          <button className={naverStyle} onClick={() => handleLogin('/naver')}>
            <SiNaver />
            <span className="ms-3">네이버 로그인</span>
          </button>
        </div>
        <div className="text-center">
          <Button handleClick={close}>닫기</Button>
        </div>
      </div>
    </CustomModal>
  );
}
