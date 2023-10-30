import React from 'react';
import CategoryItem from './CategoryItem';

export default function CategoryGroup({ title }) {
  return (
    <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-4">
      <span className="">{title}</span>
      <CategoryItem className="" />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
    </div>
  );
}
