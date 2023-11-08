import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Button } from 'flowbite-react';
import { API } from '../../utils/axios';

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
  const [totalTime, setTotalTime] = useState(0);
  const [otherUserData, setOtherUserData] = useState([]);
  const [myData, setMyData] = useState(0);
  const [subject, setSubject] = useState('영어');
  const [isStartButtonVisible, setIsStartButtonVisible] = useState(false);
  const intervalRefs = useRef({});
  const myIntervalRef = useRef();

  const diffTimeRef = useRef(0);

  const handleChangeSubject = currentSubject => {
    setSubject(currentSubject);
  };

  useEffect(() => {
    setSocket(io(import.meta.env.VITE_APP_SOCKET_STOPWATCH_SERVER_URL, { auth: { userId } }));
    // const fetchUserTimer = async () => {
    //   try {
    //     const response = await API.get('/timer');
    //     const data = response.data;
    //     // const groupData = data.groupData.slice(1);
    //     const groupData = data.groupData;
    //     const myData = data.userTimerInfo;
    //     console.log(data, 'data');
    //     // console.log(userId, 'userId');
    //     console.log(groupData[0], 'groupData');
    //     // console.log(groupData[1].members, '우히이히히');
    //     setOtherUserData(groupData[1].members); // 나중에 해당 그룹으로 정보 찾기 수정 필요
    //     setMyData(myData);
    //     setTotalTime(myData.total_time);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchUserTimer();
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
      setOtherUserData(useData[1].members);
      const myTotalTime = useData[1].members.find(item => item._id === userId);
      setTotalTime(myTotalTime.total_time);
    });

    socket.on('myStopwatchStart-to-Other', handleStartWatchEvent);
    socket.on('myStopwatchPause-to-Other', handlePauseWatchEvent);

    window.addEventListener('beforeunload', handlePause); // 새로 고침 감지 후 데이터 저장

    return () => {
      // for (const userId in intervalRefs.current) {
      //   clearInterval(intervalRefs.current[userId]);
      // }

      window.removeEventListener('beforeunload', handlePause); // 새로 고침 감지 후 데이터 저장

      socket.disconnect();
      socket.off('myStopwatchStart-to-Other', handleStartWatchEvent);
      socket.off('myStopwatchPause-to-Other', handlePauseWatchEvent);
    };
  }, [socket]);

  console.log(otherUserData);

  const handleStart = () => {
    setIsRunning(true);
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
      // roomNickname,
      subject,
      time,
      stopwatch_running: false,
    });

    diffTimeRef.current = 0;
  };

  // useEffect(() => {
  //   //타이머를 실행중인경우 프론트에서 정각마다 소켓이벤트를 발생시킴
  //   const updateTimerInterval = setInterval(() => {
  //     if (isRunning) {
  //       socket.current.emit('updateTimer', {
  //         userId,
  //         subject,
  //         totalTime,
  //         stopwatch_running: true,
  //       });
  //     }
  //   }, 60 * 60 * 1000); // 1시간마다 실행
  //   return () => clearInterval(updateTimerInterval);
  // }, [isRunning, subject, totalTime, userId]);

  // 스톱워치 시작 이벤트 핸들러

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
    console.log(receivedData, 'handlePauseWatchEvent');

    clearInterval(intervalRefs.current[receivedData._id]);
  };

  // Reset 버튼 클릭 이벤트 핸들러
  const resetTimer = () => {
    clearInterval(intervalRefs.current['self']);
    setTotalTime(0);
    socket.emit('reset_watch', {
      userId,
      // roomNickname,
      subject,
    });
  };

  return (
    <div>
      <h1>My stopwatch</h1>
      <h2>내 시간 : {formatTime(totalTime)}</h2>
      <p>현재 선택 과목 : {subject}</p>
      <div className="flex gap-4">
        <Button onClick={() => handleChangeSubject('영어')}>영어</Button>
        <Button onClick={() => handleChangeSubject('수학')}>수학</Button>
        <Button onClick={() => handleChangeSubject('국어')}>국어</Button>
      </div>
      <div className="mt-5 flex gap-4">
        {isStartButtonVisible ? (
          <Button onClick={handlePause}>Pause</Button>
        ) : (
          <Button onClick={handleStart}>Start</Button>
        )}

        <Button onClick={resetTimer}>Reset</Button>
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
