import React, { useEffect, useState } from 'react';
import { API } from '../../../utils/axios';

export default function MyGroupRequest() {
  const [pendingGroups, setPendingGroups] = useState([]);

  useEffect(() => {
    const getPendingGroups = async () => {
      try {
        const res = await API.get('/group/pendingGroups');
        setPendingGroups(res.data.pendingGroups); // 서버에서 받은 데이터를 설정
      } catch (error) {
        console.error('Error fetching pending groups:', error);
      }
    };

    getPendingGroups();
  }, []);
  console.log(pendingGroups);
  return (
    <div className="border-2 h-48">
      <p>내가 신청중인 그룹</p>
      {pendingGroups.map(group => (
        <div key={group._id} className="flex flex-col justify-center w-fit gap-2">
          <p>GroupName: {group.group_name}</p>
          <img src={group.group_image_path} alt="Group Image" />
        </div>
      ))}
    </div>
  );
}
