import React, { useEffect, useRef } from 'react';
import './MessageContainer.css';
import { Container } from '@mui/system';
import { Box } from '@mui/material';

const colorList = ['00FF00', '3f3fe1', '5F9EA0', 'B22222', '2E8B57', '191970', '008000', 'D2691E', 'FF0000'];

const MessageContainer = ({ chatLog, user }) => {
  const messageContainerRef = useRef(null);
  console.log('user는', user);
  console.log('chatLog는', chatLog);
  // 메세지 컨테이너 스크롤바 ref로 새로고침 시 맨 아래에 위치하도록 설정
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [chatLog]);
  return (
    <div className="mb-5 max-h-[80%]">
      <Box
        ref={messageContainerRef}
        className="message-container mt-12"
        style={{
          maxHeight: '70vh', // Adjust the percentage as needed
          overflowY: 'auto', // 세로 스크롤을 자동으로 활성화합니다.
        }}
      >
        {chatLog.map((message, index) => {
          console.log(message, 'messagemessage');
          // console.log('index', index);
          return (
            <Container key={index}>
              {/* <Container key={message._id} className="message-container"> */}
              <div className="message-one-container flex items-center gap-2">
                {/* <img src="/profile.jpeg" className="profile-image" /> */}
                <span className={`user-name meta${index % colorList.length}`}>{message.user.name}</span>
                <div className="colon">:</div>
                <div className="message">{message.chat}</div>
                <br />
                {/* <div>{message.sendAt}</div> */}
              </div>
            </Container>
          );
        })}
      </Box>
    </div>
  );
};

export default MessageContainer;
