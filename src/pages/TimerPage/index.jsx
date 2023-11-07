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
  const [isRunning, setIsRunning] = useState(false);
  const userId = useSelector(state => state.user?.userInfo?.id);
  const [socket, setSocket] = useState(null);
  const [time, setTime] = useState(0);
  const [data, setData] = useState({});
  const [subject, setSubject] = useState('수학');
  const intervalRefs = useRef({});

  const diffRef = useRef(0);

  const handleChangeSubject = currentSubject => {
    setSubject(currentSubject);
  };

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

        console.log('서버에 방에 입장하고 싶다는 요청을 보냄!!groupId:', groupId);
      });
    });

    socket.on('groupJoined', groupId => {
      console.log(`클라이언트가 그룹 ${groupId}에 연결했습니다.`);
    });

    socket.on('myStopwatchStart-to-Other', handleStartWatchEvent);
    socket.on('myStopwatchPause-to-Other', handlePauseWatchEvent);

    return () => {
      for (const userId in intervalRefs.current) {
        clearInterval(intervalRefs.current[userId]);
      }
      socket.disconnect();
      socket.off('myStopwatchStart-to-Other', handleStartWatchEvent);
      socket.off('myStopwatchPause-to-Other', handlePauseWatchEvent);
    };
  }, [socket]);

  const handleStart = () => {
    // 이전 인터벌을 정리
    if (intervalRefs.current['self']) {
      clearInterval(intervalRefs.current['self']);
    }

    setIsRunning(true);

    const newIntervalRef = setInterval(() => {
      diffRef.current += 1;
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

  // Pause 버튼 클릭 이벤트 핸들러
  const handlePause = () => {
    clearInterval(intervalRefs.current['self']);

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

    const time = diffRef.current;
    socket.emit('pause_watch', {
      userId,
      // roomNickname,
      subject,
      time,
      stopwatch_running: false,
    });

    diffRef.current = 0;
  };

  // useEffect(() => {
  //   //타이머를 실행중인경우 프론트에서 정각마다 소켓이벤트를 발생시킴
  //   const updateTimerInterval = setInterval(() => {
  //     if (isRunning) {
  //       socket.current.emit('updateTimer', {
  //         userId,
  //         subject,
  //         time,
  //         stopwatch_running: true,
  //       });
  //     }
  //   }, 60 * 60 * 1000); // 1시간마다 실행
  //   return () => clearInterval(updateTimerInterval);
  // }, [isRunning, subject, time, userId]);

  // 스톱워치 시작 이벤트 핸들러
  const handleStartWatchEvent = receivedData => {
    console.log('Received myStopwatchStart-to-Other event:', receivedData);
    setData(prevData => ({
      ...prevData,
      [receivedData.userId]: receivedData,
    }));

    if (receivedData.stopwatch_running) {
      const startTime = receivedData.time || 0;
      const startTimeStamp = Date.now();

      const updateInterval = setInterval(() => {
        const currentTimeStamp = Date.now();
        const elapsedTime = Math.floor((currentTimeStamp - startTimeStamp) / 1000);
        console.log(elapsedTime);
        const updatedTime = startTime + elapsedTime;
        setData(prevData => ({
          ...prevData,
          [receivedData.userId]: {
            ...prevData[receivedData.userId],
            time: updatedTime,
          },
        }));

        if (!receivedData.stopwatch_running) {
          clearInterval(updateInterval);
        }
      }, 1000);

      intervalRefs.current[receivedData.userId] = updateInterval;
    }
  };

  // Pause 이벤트 핸들러
  const handlePauseWatchEvent = async receivedData => {
    console.log('Received myStopwatchPause-to-Other event:', receivedData);

    // 내 스톱워치를 정지했을 때만 내 스톱워치 업데이트
    if (!receivedData.stopwatch_running && receivedData.userId === userId) {
      clearInterval(intervalRefs.current[receivedData.userId]);
    }

    setData(prevData => {
      const updatedData = { ...prevData };

      if (updatedData[receivedData.userId]) {
        const userToUpdate = updatedData[receivedData.userId];

        // 모든 사용자의 스톱워치 정보 업데이트
        userToUpdate.stopwatch_running = receivedData.stopwatch_running;
        userToUpdate.time = receivedData.time;
      }
      return updatedData;
    });
  };

  // Reset 버튼 클릭 이벤트 핸들러
  const resetTimer = () => {
    clearInterval(intervalRefs.current['self']);
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
      <button onClick={() => handleChangeSubject('영어')}>영어</button>
      <button onClick={() => handleChangeSubject('수학')}>수학</button>
      <button onClick={() => handleChangeSubject('국어')}>국어</button>
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
