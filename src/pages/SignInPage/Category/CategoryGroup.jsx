import React from 'react';
import CategoryItem from './CategoryItem';

export default function CategoryGroup({ title, contentArr, category, setCategory }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-10 border-2 px-10 py-5 border-primary rounded-lg">
      <span className="col-span-3 md:col-span-4 text-center text-xl font-bold">{title}</span>
      {contentArr?.map(content => (
        <CategoryItem key={content} content={content} category={category} setCategory={setCategory} />
      ))}
    </div>
  );
}
