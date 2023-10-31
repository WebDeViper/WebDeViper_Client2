// 모달 개념 으로 만들기
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import Button from '../../components/common/Button';
import CustomModal from '../../components/common/CustomModal';
import { Link } from 'react-router-dom';
import { redirectUrl } from '../../utils/redirectUrl';

export default function LoginModal({ isOpen, close }) {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = redirectUrl();
  const KAKAO_LOGIN_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <CustomModal isOpen={isOpen} close={close}>
      <div className="px-10 py-14">
        <h1 className="text-center font-bold text-2xl col-span-3 mb-8">로그인</h1>
        <div className="mb-5">
          <Link
            to={KAKAO_LOGIN_URI}
            className="col-span-3 flex items-center text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg"
          >
            <RiKakaoTalkFill />
            <span className="ms-3">카카오 로그인</span>
          </Link>
          <button
            className="col-span-3 flex items-center text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg"
            onClick={() => handleLogin('google')}
          >
            <FcGoogle />
            <span className="ms-3">구글 로그인</span>
          </button>
          <button
            className="col-span-3 flex items-center text-light text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg"
            onClick={() => handleLogin('/naver')}
          >
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
