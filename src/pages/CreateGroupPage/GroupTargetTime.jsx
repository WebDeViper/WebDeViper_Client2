import React from 'react';
import DropDown from '../../components/common/DropDown';

export default function GroupTargetTime({ groupInfo, setGroupInfo }) {
  const items = [2, 4, 6, 8, 10];
  const handleClick = time => setGroupInfo({ ...groupInfo, dailyGoalTime: time });
  return (
    <div className="groupTargetTime flex justify-start">
      <DropDown items={items} title="시간 선택" itemStyle={''} styles={'font-bold text-xl'} handleClick={handleClick} />
    </div>
  );
}