import React from 'react';
import DropDown from '../../components/common/DropDown';

export default function GroupCategory({ groupInfo, setGroupInfo }) {
  const items = ['경찰', '소방관', '군인', '초등학생', '중학생', '고등학생', '등등'];
  const handleClick = selectedCategory => setGroupInfo({ ...groupInfo, category: selectedCategory });
  return (
    <div className="groupCategory flex justify-between">
      <DropDown
        items={items}
        title="카테고리 선택"
        itemStyle={''}
        styles={'font-bold text-xl'}
        handleClick={handleClick}
      />
    </div>
  );
}
