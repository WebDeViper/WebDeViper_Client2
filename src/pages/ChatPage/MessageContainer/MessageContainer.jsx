import React, { useEffect, useRef } from 'react';
import './MessageContainer.css';
import { Container } from '@mui/system';
import { Box } from '@mui/material';

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
    <div className="h-full mb-5">
      <Box
        ref={messageContainerRef}
        className="message-container"
        style={{
          maxHeight: '850px', // 컨테이너의 최대 높이를 설정합니다.
          overflowY: 'auto', // 세로 스크롤을 자동으로 활성화합니다.
        }}
      >
        {chatLog.map((message, index) => {
          console.log(message, 'messagemessage');
          // console.log('index', index);
          return (
            <Container key={index}>
              {/* <Container key={message._id} className="message-container"> */}
              {message.user.name === 'system' ? (
                <div className="system-message-container">
                  <p className="system-message">{message.chat}</p>
                </div>
              ) : message.user.name === user.nickName ? (
                <div className="my-message-container">
                  <div className="my-message">{message.chat}</div>
                </div>
              ) : (
                <div className="your-message-container">
                  <img src="/profile.jpeg" className="profile-image" />
                  <div>{message.user.name}</div>
                  <div className="your-message">{message.chat}</div>
                  <br />
                  {/* <div>{message.sendAt}</div> */}
                </div>
              )}
            </Container>
          );
        })}
      </Box>
    </div>
  );
};

export default MessageContainer;
