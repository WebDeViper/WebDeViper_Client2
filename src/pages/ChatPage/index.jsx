import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chatSocket } from '../../utils/socketServer';
import { Button } from '@mui/base/Button';
import './index.css';
import InputField from './InputField/InputField';
import MessageContainer from './MessageContainer/MessageContainer';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  // console.log('유저정보는', user);
  const user = useSelector(state => state.user?.userInfo);
  const { roomId } = useParams(); // 유저가 조인한 방의 아이디를 url에서 가져온다
  console.log('룸 아이디>>', roomId);
  const [chatLog, setChatLog] = useState([]); // 배열로 변경
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // 채팅창 떠날 때
  const leaveRoom = () => {
    chatSocket.emit('leaveRoom', user, res => {
      if (res.ok) navigate(-1); // 다시 채팅방 리스트 페이지로 돌아감
    });
  };

  // console.log('message List', chatLog);
  // console.log('룸아이디???', roomId);
  // 채팅 화면 처음 들어올 때
  useEffect(() => {
    console.log('유저는>>', user);

    chatSocket.emit('joinRoom', user, roomId, res => {
      if (res && res.ok) {
        console.log('successfully join', res);
      } else {
        console.log('fail to join', res);
      }
    });
    chatSocket.on('message', message => {
      // message 이벤트를 수신하면 이 함수가 실행됩니다.
      // 여기서 message는 서버에서 보낸 데이터입니다.
      console.log('서버로부터 메시지 수신:', message, '라고?');
      setChatLog(prevState => prevState.concat(message));
    });
    // 서버에서 이전 채팅 로그를 받아온다
    chatSocket.emit('getChatLog', roomId, res => {
      if (res?.isOk) {
        console.log('서버에서 받은 채팅 로그:', res.data);
        setChatLog(prevState => prevState.concat(res.data));
      }
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();
    chatSocket.emit('sendMessage', roomId, message, res => {
      if (!res.ok) {
        console.log('error message', res.error);
      }
      setMessage('');
    });
  };

  return (
    <div>
      <div className="App">
        <nav>
          <Button onClick={leaveRoom} className="back-button">
            ←
          </Button>
          <div className="nav-user">{user.nick_name}</div>
        </nav>
        <div>{chatLog.length > 0 ? <MessageContainer chatLog={chatLog} user={user} /> : null}</div>
        <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
