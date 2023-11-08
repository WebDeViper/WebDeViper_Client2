import React from 'react';
import { API } from '../../utils/axios';
import { chatSocket } from '../../utils/socketServer';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function MyGroupPage() {
  const { groupId } = useParams();
  // const location = useLocation();
  // const roomId = location.state.roomId;
  // console.log('룸아이디 오는거 확인>>>', roomId);
  const userName = useSelector(state => state.user?.userInfo?.nickName);
  const navigate = useNavigate();

  const handleChat = () => {
    chatSocket.emit('login', userName, res => {
      if (res && res.isOk) {
        console.log('successfully login', res);
        navigate(`/group/chat/${groupId}`);
      } else {
        console.log('fail to login', res);
        alert('로그인해주세요!');
      }
    });
  };

  const buttonStyle = (backgroundColor, color) => ({
    backgroundColor: backgroundColor, // 원하는 배경색 설정
    borderRadius: '8px', // 버튼을 둥글게 만드는
    color: color, // 텍스트 색상 설정
    marginRight: '10px', // 오른쪽 여백을 추가하여 버튼 사이의 간격 조정
  });

  const buttonContainer = {
    display: 'flex', // 버튼을 가로로 나란히 정렬
  };

  // 그룹 삭제
  const deleteGroup = async () => {
    try {
      const res = await API.delete(`group/studyGroup/${groupId}/members`);
      console.log(res.data.message);
      alert(`${res.data.message}`);
      navigate('/');
    } catch (error) {
      console.error('그룹 삭제에 실패하셨습니다. ->', error);
    }
  };

  //그룹 탈퇴
  const leaveGroup = async () => {
    try {
      const res = await API.delete(`group/studyGroup/${groupId}`);
      console.log(res.data.msg);
      alert(`${res.data.msg}`);
      navigate('/');
    } catch (error) {
      console.error('그룹 탈퇴에 실패하셨습니다. ->', error);
    }
  };

  return (
    <div>
      <h1>{groupId}에 대한 상세 페이지 레고</h1>
      <button onClick={handleChat}>채팅창 이동하기</button>
      <br />
      <br />
      <div style={buttonContainer}>
        <button onClick={deleteGroup} style={buttonStyle('blue', 'white')}>
          그룹삭제
        </button>

        <button onClick={leaveGroup} style={buttonStyle('red', 'white')}>
          그룹탈퇴
        </button>
      </div>
    </div>
  );
}
