import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (url, options) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let newSocket;

    if (options) {
      newSocket = io(url, options);
    } else {
      newSocket = io(url);
    }

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
