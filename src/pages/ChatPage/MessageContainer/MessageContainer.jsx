import React, { useState } from 'react';
import './MessageContainer.css';
import { Container } from '@mui/system';

const MessageContainer = ({ chatLog, user }) => {
  console.log('user는', user);
  console.log('chatLog는', chatLog);
  return (
    <div>
      {chatLog.map((message, index) => {
        // console.log('index', index);

        return (
          <Container key={index} className="message-container">
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
    </div>
  );
};

export default MessageContainer;
