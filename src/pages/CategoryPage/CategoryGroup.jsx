import React, { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem';

export default function CategoryGroup({ title, contentArr, selectedCategory, setSelectedCategory }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-10 border-2 px-10 py-5 border-primary rounded-lg">
      <span className="col-span-4 text-center text-xl font-semibold">{title}</span>
      {contentArr?.map(content => (
        <CategoryItem
          key={content}
          content={content}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </div>
  );
}
