import React from 'react';
import DropDown from '../../components/common/DropDown';

export default function GroupTargetTime({ groupInfo, setGroupInfo }) {
  const items = [2, 4, 6, 8, 10];
  const handleClick = time => setGroupInfo({ ...groupInfo, dailyGoalTime: time });
  return (
    <div className="groupTargetTime flex flex-col justify-start border-2 rounded-lg !border-semi_primary p-2 mb-2">
      <DropDown items={items} title="목표 시간" itemStyle={''} styles={'font-bold text-xl'} handleClick={handleClick} />
      <div className="font-semibold text-center">{groupInfo.dailyGoalTime ? groupInfo.dailyGoalTime : <br />}</div>
    </div>
  );
}
