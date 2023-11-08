// 모달 개념 으로 만들기
import { useEffect, useState } from 'react';
// import './index.css';
// import video from '../../../public/video/1100452489-preview.mp4';
// import video from '../../../public/video/1093805953-preview.mp4';
import LoginModal from './LoginModal';
import Button from '../../components/common/Button';
import Title from './Title';
import { useNavigate } from 'react-router-dom/dist';

export default function LoginPage({ isAuth }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <div className="bg-[url('/img/main_cover.jpg')] bg-cover h-screen flex flex-col w-screen items-center justify-between">
      {/* <video autoPlay loop muted> */}
      {/* <source src={video} type="video/mp4" /> */}
      {/* </video> */}
      <Title />
      <Button customStyle="h-10 absolute bottom-10 left-50" handleClick={handleOpenModal}>
        로그인
      </Button>
      <LoginModal isOpen={modalIsOpen} close={handleCloseModal} />
    </div>
  );
}
