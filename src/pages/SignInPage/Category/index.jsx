import React from 'react';
import CategoryGroup from './CategoryGroup';
import categories from '../../../data/category';

export default function Category({ category, setCategory }) {
  const studentArr = [...categories.student];
  const workerArr = [...categories.worker];
  const etcArr = [...categories.etc];
  return (
    <div className="categoryContainer">
      <div className="categoryTitle flex justify-between items-center mb-3">
        <h2 className="font-bold text-2xl">어떤 부분에 관심 있으세요?</h2>
      </div>
      <div className="categoryWrap flex flex-col">
        <CategoryGroup title={'학생'} contentArr={studentArr} category={category} setCategory={setCategory} />
        <CategoryGroup title={'직장인'} contentArr={workerArr} category={category} setCategory={setCategory} />
        <CategoryGroup title={'기타'} contentArr={etcArr} category={category} setCategory={setCategory} />
      </div>
    </div>
  );
}
