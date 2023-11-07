import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const formatTime = seconds => {
  const padZero = value => (value < 10 ? `0${value}` : `${value}`);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
};

export default function TimerPage() {
  const userId = useSelector(state => state.user?.userInfo?.id);
  const [socket, setSocket] = useState(null);
  const [time, setTime] = useState(0);
  const [data, setData] = useState({});
  const [subject, setSubject] = useState('');
  const intervalRefs = useRef({});

  useEffect(() => {
    setSocket(io('http://localhost:8002/stopwatch', { auth: { userId } }));
  }, [userId]);

  useEffect(() => {
    if (!socket) return;
    socket.on('welcome', userGroups => {
      console.log(userGroups);

      userGroups.forEach(groupId => {
        socket.emit('joinGroup', groupId);
        console.log('방에입장!!', groupId);
      });
    });

    return () => {
      for (const userId in intervalRefs.current) {
        clearInterval(intervalRefs.current[userId]);
      }
      socket.disconnect();
    };
  }, [socket]);

  const handleStart = () => {
    // 이전 인터벌을 정리
    if (intervalRefs.current['self']) {
      clearInterval(intervalRefs.current['self']);
    }

    // setIsRunning(true);
    // setIsStartButtonVisible(false);

    const newIntervalRef = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    intervalRefs.current['self'] = newIntervalRef;

    // 스타트 이벤트를 서버로 보냄
    socket.emit('start_watch', {
      userId, //objId로 변경
      // roomNickname,
      subject,
    });
  };

  const handlePause = () => {
    // setIsRunning(false);
    clearInterval(intervalRefs.current['self']);
    // setIsStartButtonVisible(true);

    setData(prevData => {
      const updatedData = { ...prevData };

      if (updatedData[userId]) {
        const userToUpdate = updatedData[userId];
        userToUpdate.time = time;
        userToUpdate.stopwatch_running = false;
      }
      return updatedData;
    });

    // Pause 이벤트를 서버로 보냄
    socket.emit('pause_watch', {
      userId,
      // roomNickname,
      subject,
      time,
      stopwatch_running: false,
    });
  };

  // Reset 버튼 클릭 이벤트 핸들러
  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRefs.current['self']);
    setIsStartButtonVisible(true);
    setTime(0);
    socket.emit('reset_watch', {
      userId,
      // roomNickname,
      subject,
    });
  };

  return (
    <div>
      <h1>My stopwatch</h1>

      <h2>내 시간 : {formatTime(time)}</h2>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <h2>Other User's Stopwatches</h2>
      <ul>
        {Object.values(data).map(userData => {
          return (
            <li key={userData.userId}>
              <strong>{userData.userId}:</strong>{' '}
              {userData.stopwatch_running
                ? `Running - ${formatTime(userData.time || 0)}`
                : `Paused - ${formatTime(userData.time || 0)}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
