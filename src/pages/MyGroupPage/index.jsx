import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function MyGroupPage() {
  const location = useLocation();
  const roomId = location.state.roomId;
  console.log('룸아이디 오는거 확인>>>', roomId);
  const { groupId } = useParams();
  const navigate = useNavigate();

  const handleChat = () => {
    navigate(`/group/chat/${roomId}`);
  };

  return (
    <div>
      <h1>{groupId}에 대한 상세 페이지 레고</h1>
      <button onClick={handleChat}>채팅창 이동하기</button>
    </div>
  );
}
