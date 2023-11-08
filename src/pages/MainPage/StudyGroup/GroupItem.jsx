import { Link } from 'react-router-dom';
import { API } from '../../../utils/axios';
import Button from '../../../components/common/Button';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function GroupItem({ group_id, subject, imagePath, category, description, members }) {
  const userId = useSelector(state => state.user.userInfo.id);
  const [roomId, setRoomId] = useState(null);
  const maxLength = 20; // 원하는 최대 길이
  const truncatedDescription =
    description && description.length > maxLength
      ? description.slice(0, maxLength) + '...' // 긴 경우 잘라내고 '...'을 추가
      : description; // 길이가 작은 경우 그대로 둡니다
  useEffect(() => {
    const handleRooms = async () => {
      try {
        const res = await API.get('/group/rooms');
        console.log('요청', res.data);
        const foundRoom = res.data.find(room => room.group === group_id);
        if (foundRoom) {
          setRoomId(foundRoom._id); // 찾은 roomId를 설정
        }
      } catch (err) {
        console.error('에러!!!', err);
      }
    };

    handleRooms();
  }, [group_id]);

  const handleGroupRequest = async groupId => {
    try {
      console.log('그룹아이디는', groupId);
      const res = await API.post(`/group/studyGroup/${groupId}/join`);
      console.log('상태코드는', res.status);

      if (!res.data.isFull) {
        console.log('그룹신청완료 >>', res.data);
        const data = res.data.message;
        return alert(data);
      } else {
        alert(`${res.data.message}`);
      }
    } catch (err) {
      console.error(err.message);
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  };

  // 마우스 호버
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Link to={`/group/${group_id}`} state={{ roomId: roomId }}>
      <div
        className={`rounded-[4px] shadow-xl px-9 pb-5 pt-[25px] h-full `}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className={`flex items-center flex-col ${isHovering ? 'bg-gray-200 opacity-25' : ''}`}>
          <img
            className="rounded-full w-16 h-16"
            src={`${import.meta.env.VITE_APP_BACK_URL}${imagePath}`}
            alt="귀여운 우유"
          />
          <div className="mt-4 h-24 flex flex-col">
            <h3 className="font-bold text-center">{subject}</h3>
            <p className="text-start" style={{ overflowWrap: 'anywhere' }}>
              {truncatedDescription}
            </p>
          </div>
          <div className="mt-2.5">
            <span className="block bg-indigo-100 text-indigo-800 left- text-md font-bold mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
              {category}
            </span>
          </div>
        </div>
        {members.find(memberId => memberId !== userId) ? (
          <Button
            handleClick={() => handleGroupRequest(group_id)}
            customStyle={`fixed bottom-3 left-1/2 transform -translate-x-1/2 ${isHovering ? 'show z-50' : 'hidden'}`}
          >
            신청하기
          </Button>
        ) : (
          ''
        )}
      </div>
    </Link>
  );
}
