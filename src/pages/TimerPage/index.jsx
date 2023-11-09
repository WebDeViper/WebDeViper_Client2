import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
// import { Button } from '@mui/material/Button';
import Button from '@mui/material/Button';

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
  const [totalTime, setTotalTime] = useState(0);
  const [otherUserData, setOtherUserData] = useState([]);
  const [subject, setSubject] = useState('영어');
  const [isStartButtonVisible, setIsStartButtonVisible] = useState(false);
  const intervalRefs = useRef({});
  const myIntervalRef = useRef();
  const diffTimeRef = useRef(0);

  const handleChangeSubject = currentSubject => {
    console.log('zmfflr');
    setSubject(currentSubject);
  };

  useEffect(() => {
    setSocket(io(import.meta.env.VITE_APP_SOCKET_STOPWATCH_SERVER_URL, { auth: { userId } }));
  }, [userId]);

  useEffect(() => {
    if (!socket) return;
    socket.on('welcome', userGroups => {
      // userGroups 배열을 순회하며 각 그룹에 join 요청을 보냅니다.
      userGroups.forEach(groupId => {
        socket.emit('joinGroup', groupId);
      });
    });

    socket.on('groupJoined', useData => {
      console.log(useData);
      setOtherUserData(useData[0].members);
      const myTotalTime = useData[1].members.find(item => item._id === userId);
      setTotalTime(myTotalTime.total_time);
    });

    socket.on('myStopwatchStart-to-Other', handleStartWatchEvent);
    socket.on('myStopwatchPause-to-Other', handlePauseWatchEvent);

    window.addEventListener('beforeunload', handlePause); // 새로 고침 감지 후 데이터 저장

    return () => {
      window.removeEventListener('beforeunload', handlePause); // 새로 고침 감지 후 데이터 저장

      socket.disconnect();
      socket.off('myStopwatchStart-to-Other', handleStartWatchEvent);
      socket.off('myStopwatchPause-to-Other', handlePauseWatchEvent);
    };
  }, [socket]);

  const handleStart = () => {
    setIsStartButtonVisible(true);

    myIntervalRef.current = setInterval(() => {
      diffTimeRef.current += 1;
      setTotalTime(prevTime => prevTime + 1);
    }, 1000);

    // 스타트 이벤트를 서버로 보냄
    socket.emit('start_watch', {
      userId, //objId로 변경
      // roomNickname,
      subject,
    });
  };

  // Pause 버튼 클릭 이벤트 핸들러
  const handlePause = () => {
    setIsStartButtonVisible(false);
    clearInterval(myIntervalRef.current);

    // Pause 이벤트를 서버로 보냄
    const time = diffTimeRef.current;
    socket.emit('pause_watch', {
      // 안에 정보는 건들지 말기
      userId,
      subject,
      time,
      stopwatch_running: false,
    });

    diffTimeRef.current = 0;
  };

  const handleStartWatchEvent = receivedData => {
    if (receivedData.is_running) {
      let time = 0;
      const newIntervalRef = setInterval(() => {
        time += 1;
        console.log('실행');
        setOtherUserData(prevData =>
          prevData.map(item => {
            if (item._id === receivedData._id) {
              return {
                ...item,
                is_running: receivedData.is_running,
                total_time: receivedData.time + time,
              };
            }
            return item;
          })
        );
      }, 1000);
      intervalRefs.current[receivedData._id] = newIntervalRef;
    }
  };

  // Pause 이벤트 핸들러
  const handlePauseWatchEvent = async receivedData => {
    clearInterval(intervalRefs.current[receivedData._id]);
  };

  const padZero = value => (value < 10 ? `0${value}` : `${value}`);

  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;

  return (
    <div className="mt-10">
      <section className="">
        <div className="flex gap-8 items-center justify-center">
          <div className="flex flex-col items-center">
            <p>Hours</p>
            <div className="shadow-xl px-4 py-6 text-9xl w-[210px] rounded-lg flex justify-center">
              {padZero(hours)}
            </div>
          </div>
          <span className="mt-10 text-4xl">:</span>
          <div className="flex flex-col items-center">
            <p>Minutes</p>
            <div className="shadow-xl px-4 py-6 text-9xl w-[210px] rounded-lg flex justify-center">
              {padZero(minutes)}
            </div>
          </div>
          <span className="mt-10 text-4xl">:</span>
          <div className="flex flex-col items-center">
            <p>Seconds</p>
            <div className="shadow-xl px-4 py-6 text-9xl w-[210px] rounded-lg flex justify-center">
              {padZero(seconds)}
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          {isStartButtonVisible ? (
            <Button variant="outlined" size="large" onClick={handlePause}>
              Pause
            </Button>
          ) : (
            <Button variant="outlined" size="large" onClick={handleStart}>
              Start
            </Button>
          )}
        </div>
      </section>

      {/* <h2>내 시간 : {formatTime(totalTime)}</h2> */}
      <p>현재 선택 과목 : {subject}</p>
      <div className="flex gap-4">
        <Button onClick={() => handleChangeSubject('영어')}>영어</Button>
        <Button onClick={() => handleChangeSubject('수학')}>수학</Button>
        <Button onClick={() => handleChangeSubject('국어')}>국어</Button>
      </div>
      <div className="mt-5 flex gap-4">
        {/* {isStartButtonVisible ? (
          <Button className="px-6 py-3 text-4xl" onClick={handlePause}>
            Pause
          </Button>
        ) : (
          <Button className="px-6 py-3 text-4xl" onClick={handleStart}>
            Start
          </Button>
        )} */}
      </div>
      <h2>Other User's Stopwatches</h2>
      <ul>
        {otherUserData?.map((userData, index) => {
          return (
            <li key={index}>
              <strong>{userData.nick_name}:</strong>{' '}
              {userData.total_time
                ? `Running - ${formatTime(userData.total_time || 0)}`
                : `Paused - ${formatTime(userData.total_time || 0)}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
