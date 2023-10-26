// 모달 개념 으로 만들기
import React, { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import { useRef } from 'react';
import Button from '../../components/common/Button';

export default function LoginPage() {
  // 모달창 제어
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalBackground = useRef<HTMLDivElement>(null);
  const handleModalClose = (e: React.MouseEvent) => {
    e.target === modalBackground.current ? setIsOpen(false) : '';
  };

  useEffect(() => {
    setIsOpen(false);
  }, []);

  // 모달창 노출
  const showModal = () => {
    setIsOpen(true);
  };

  return (
    // 모달 밖에 ref 설정해서 클릭할 때 모달창 꺼지도록
    <div
      className="h-screen flex w-screen items-center justify-between"
      ref={modalBackground}
      onClick={e => handleModalClose(e)}
    >
      <img src="/public/img/main_cover.jpg" alt="login_main_img" className="w-3/4" />
      <Button customStyle="h-10" handleClick={showModal}>
        로그인
      </Button>
      {isOpen && <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
