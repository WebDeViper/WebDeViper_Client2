import React from 'react';
import DropDown from '../../components/common/DropDown';
import categories from '../../data/category';

export default function GroupCategory({ groupInfo, setGroupInfo }) {
  const items = [...categories.student, ...categories.worker, ...categories.etc];

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
