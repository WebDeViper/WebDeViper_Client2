// 모달 개념 으로 만들기
import React, { useState } from 'react';
import LoginModal from './LoginModal';

export default function LoginPage() {
  const [modalOpen, setIsOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <button onClick={showModal}>모달 띄우기</button>
      {modalOpen && <LoginModal setIsOpen={setIsOpen} />}
    </div>
  );
}
