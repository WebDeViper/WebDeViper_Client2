// 모달 개념 으로 만들기
import { RiKakaoTalkFill, RiIeFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../Button';
import CustomModal from '../CustomModal';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { redirectUrl } from '../../../utils/redirectUrl';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../reducers/thunkFunctions';

export default function LoginModal({ isOpen, close }) {
  const navigate = useNavigate();

  // API & Redirect URI
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = redirectUrl('kakao');
  const KAKAO_LOGIN_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_STATE = import.meta.env.VITE_NAVER_STATE;
  const NAVER_REDIRECT_URI = redirectUrl('naver');
  const NAVER_LOGIN_URI = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`;

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URL = redirectUrl('google');
  const GOOGLE_LOGIN_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URL}&response_type=code&scope=email profile`;

  // style
  // const kakaoColor = '#FEE500';
  // const googleColor = '#fefefe';
  // const naverColor = '#2DB400';
  const testerStyle = `w-full mb-2 box-border flex items-center text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg !bg-[#000000] !text-[#ffffff]`;
  const kakaoStyle = `w-full mb-2 box-border flex items-center text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg !bg-[#FEE500] !text-[#3D1D1E]`;
  const googleStyle = `w-full mb-2 box-border flex items-center !text-black text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg !bg-[#fefefe]`;
  const naverStyle = `w-full mb-2 box-border flex items-center text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg !bg-[#2DB400]`;

  const handleNavigate = uri => {
    window.location.href = uri;
  };

  const dispatch = useDispatch();
  const handleTesterLogin = () => {
    // 리덕스에서 로그인 로직 처리 후 리덕스로 상태관리
    const profile = {
      id: 'null',
      provider: 'test',
      isServiceAdmin: true,
    };
    dispatch(loginUser(profile));
    navigate('/');
  };

  return (
    <CustomModal isOpen={isOpen} close={close}>
      <div className="px-10 py-14 grid grid-cols-3 relative">
        <div className="absolute top-3 left-3">
          <Button customStyle={'bg-transparent'} handleClick={close}>
            <AiOutlineClose size={30} />
          </Button>
        </div>
        <h1 className="text-center font-bold text-2xl col-span-3 mb-8">로그인</h1>
        <div className="col-span-3">
          <Button handleClick={() => handleTesterLogin()} customStyle={testerStyle}>
            <RiIeFill size={25} />
            <span className="ms-3">테스터 로그인</span>
          </Button>
          <Button handleClick={() => handleNavigate(`${KAKAO_LOGIN_URI}`)} customStyle={kakaoStyle}>
            <RiKakaoTalkFill size={25} />
            <span className="ms-3">카카오 로그인</span>
          </Button>
          <Button handleClick={() => handleNavigate(`${GOOGLE_LOGIN_URI}`)} customStyle={googleStyle}>
            <FcGoogle size={25} />
            <span className="ms-3">구글 로그인</span>
          </Button>
          <Button handleClick={() => handleNavigate(`${NAVER_LOGIN_URI}`)} customStyle={naverStyle}>
            <SiNaver size={25} />
            <span className="ms-3">네이버 로그인</span>
          </Button>
        </div>
      </div>
    </CustomModal>
  );
}
