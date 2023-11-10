// 모달 개념 으로 만들기
import { useEffect, useState } from 'react';
// import './index.css';
// import video from '../../../public/video/1100452489-preview.mp4';
// import video from '../../../public/video/1093805953-preview.mp4';
import LoginModal from './LoginModal';
import Button from '../../components/common/Button';
import Title from './Title';
import { useNavigate } from 'react-router-dom/dist';
import { LuLogIn } from 'react-icons/lu';

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
    <div className="flex overflow-y-hidden h-screen md:overflow-y-auto md:h-auto">
      <div className="mainCoverImg w-full md:w-3/4">
        <Title />
      </div>
      {/* <video autoPlay loop muted> */}
      {/* <source src={video} type="video/mp4" /> */}
      {/* </video> */}
      <div className="rightWrap md:relative md:flex md:items-end md:w-1/4">
        {/* <div className="hidden md:block md:bg-[url('/img/main_cover.jpg')] w-20 h-20 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2"></div> */}
        <Button
          customStyle="h-12 text-xl bg-transparent border-2 border-primary !text-primary absolute bottom-10 w-40 left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:w-full md:mx-16 md:mb-5 flex justify-center items-center gap-4"
          handleClick={handleOpenModal}
        >
          <LuLogIn />
          LOGIN
        </Button>
      </div>
      <LoginModal isOpen={modalIsOpen} close={handleCloseModal} />
    </div>
  );
}
