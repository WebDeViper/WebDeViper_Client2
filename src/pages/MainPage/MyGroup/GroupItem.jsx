import { Link } from 'react-router-dom';
import socket from '../../../utils/socketServer';
import { API } from '../../../utils/axios';

import { useEffect, useState } from 'react';

export default function GroupItem({ group_id, subject, imagePath, category, description }) {
  console.log(description);
  const [roomId, setRoomId] = useState(null);
  // const editedDescription = description && description?.length > 15 ? description?.slice(0, 14).join('') : description;
  // console.log(editedDescription, '뭔데이거');
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

  return (
    <Link to={`/group/${group_id}`} state={{ roomId: roomId }}>
      <div className="rounded-[4px] shadow-xl px-16 pb-5 pt-[25px]">
        <div className="flex items-center flex-col">
          <div className="rounded-full w-16">
            <img src={`${import.meta.env.VITE_APP_BACK_URL}${imagePath}`} alt="귀여운 우유" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-bold">{subject}</h3>
            <p style={{ overflowWrap: 'anywhere' }}>{truncatedDescription}</p>
          </div>
          <div className="mt-2.5">
            <span className="block font-bold">{category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
