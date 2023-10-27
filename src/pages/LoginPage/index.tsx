// 모달 개념 으로 만들기
import React, { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import Button from '../../components/common/Button';
import { useRef } from 'react';
import './index.scss';
import Title from './Title';

export default function LoginPage() {
  // 모달창 제어
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // 처음 랜더링 시에 모달창 닫힌 상태로
    setIsOpen(false);
  }, []);

  // 모달창 노출
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const modalBackground = useRef<HTMLDivElement>(null);
  const handleModalCloseBackground = (e: React.MouseEvent) => {
    if (e.target === modalBackground.current) {
      setIsOpen(false);
    }
  };

  if (isOpen) {
    modalBackground.current?.classList.add('shadow');
  } else {
    modalBackground.current?.classList.remove('shadow');
  }

  return (
    // 모달 밖에 ref 설정해서 클릭할 때 모달창 꺼지도록
    <div
      className="loginBackground h-screen flex flex-col w-screen items-center justify-between"
      ref={modalBackground}
      onClick={e => handleModalCloseBackground(e)}
    >
      <Title />
      <Button customStyle="h-10 absolute bottom-10 left-50" handleClick={handleModal}>
        로그인
      </Button>
      {isOpen && <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
