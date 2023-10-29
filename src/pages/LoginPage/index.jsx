// 모달 개념 으로 만들기
import { useState } from 'react';
import LoginModal from './LoginModal';
import Button from '../../components/common/Button';
import Title from './Title';

export default function LoginPage() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-[url('img/main_cover.jpg')] bg-cover h-screen flex flex-col w-screen items-center justify-between">
      <Title />
      <Button customStyle="h-10 absolute bottom-10 left-50" handleClick={handleOpenModal}>
        로그인
      </Button>
      <LoginModal isOpen={modalIsOpen} close={handleCloseModal} />
    </div>
  );
}
