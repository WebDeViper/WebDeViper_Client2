// 모달 개념 으로 만들기
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import Button from '../../components/common/Button';
import CustomModal from '../../components/common/CustomModal';

interface Props {
  isOpen: boolean;
  close: () => void;
}

export default function LoginModal({ isOpen, close }: Props): React.ReactElement {
  const handleLogin = (url: string) => {
    window.location.href = `${import.meta.env.VITE_APP_API_URL}/user/${url}`;
  };

  return (
    <CustomModal isOpen={isOpen} close={close}>
      <div className="px-10 py-14">
        <h1 className="text-center font-bold text-2xl col-span-3 mb-8">로그인</h1>
        <div className="mb-5">
          <button
            className="col-span-3 flex items-center text-md leading-6 font-bold tracking-wider py-[10px] px-2.5 rounded-lg"
            onClick={() => handleLogin('kakao')}
          >
            <RiKakaoTalkFill />
            <span className="ms-3">카카오 로그인</span>
          </button>
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