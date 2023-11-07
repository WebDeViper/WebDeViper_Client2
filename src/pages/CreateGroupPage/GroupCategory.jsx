import React from 'react';
import DropDown from '../../components/common/DropDown';

export default function GroupCategory({ groupInfo, setGroupInfo }) {
  const items = ['경찰', '소방관', '군인', '초등학생', '중학생', '고등학생', '대학생', '기타'];
  const handleClick = selectedCategory => setGroupInfo({ ...groupInfo, category: selectedCategory });
  return (
    <div className="groupCategory flex flex-col justify-between border-2 rounded-lg !border-semi_primary p-2">
      <DropDown
        items={items}
        title="카테고리 선택"
        itemStyle={''}
        styles={'font-bold text-xl'}
        handleClick={handleClick}
      />
      <div className="font-semibold text-center">{groupInfo.category ? groupInfo.category : <br />}</div>
    </div>
  );
}
