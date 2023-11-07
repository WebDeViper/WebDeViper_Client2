import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import useSocket from '../../hooks/useSocket';
import io from 'socket.io-client';

// const socket = io('http://localhost:8002/stopwatch', { auth: { userId: '6547b0c394460fe7c69fafe6' } });
export default function TimerPage() {
  const userId = useSelector(state => state.user?.userInfo?.id);
  const [socket, setSocket] = useState(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setSocket(io('http://localhost:8002/stopwatch', { auth: { userId } }));
  }, [userId]);

  useEffect(() => {
    if (!socket) return;
    socket.on('welcome', userGroups => {
      console.log(userGroups);

      // userGroups 배열을 순회하며 각 그룹에 join 요청을 보냅니다.
      userGroups.forEach(groupId => {
        socket.emit('joinGroup', groupId);
        console.log('방에입장!!', groupId);
      });
    });
  }, [socket]);
  return <div>TimerPage</div>;
}
