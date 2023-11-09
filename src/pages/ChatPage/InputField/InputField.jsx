import React from 'react';
import { Input } from '@mui/base/Input';
import { Button } from '@mui/base/Button';
import './InputField.css';

const InputField = ({ message, setMessage, sendMessage }) => {
  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents the default newline behavior
      sendMessage(event); // Calls the sendMessage function
    }
  };
  return (
    <form
      onSubmit={sendMessage}
      className="input-container mx-1 border-2 !border-primary mb-3 h-[60px] rounded-lg flex justify-between py-2 px-3 items-center"
    >
      <input
        className="input bg-transparent focus:outline-none border-none focus:ring-0 focus:ring-offset-0 font-medium h-full flex"
        placeholder="메시지를 입력하세요…"
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        disabled={message === ''}
        type="submit"
        className="send-button rounded-lg bg-primary !text-white font-bold h-full"
      >
        전송
      </Button>
    </form>
  );
};

export default InputField;
