import React from 'react';
import CategoryGroup from './CategoryGroup';

export default function Category({ category, setCategory }) {
  const studentArr = ['초등학생', '중학생', '고등학생', '대학생'];
  const publicArr = ['경찰', '소방관', '행정고시', '군인'];

  return (
    <div className="categoryContainer">
      <div className="categoryTitle flex justify-between items-center mb-3">
        <h2 className="font-bold text-2xl">어떤 부분에 관심 있으세요?</h2>
      </div>
      <div className="categoryWrap flex flex-col">
        <CategoryGroup title={'학생'} contentArr={studentArr} category={category} setCategory={setCategory} />
        <CategoryGroup title={'공무원'} contentArr={publicArr} category={category} setCategory={setCategory} />
      </div>
    </div>
  );
}
