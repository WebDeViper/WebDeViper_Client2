import React, { useRef, useState } from 'react';

export default function CategoryItem({ content, category, setCategory }) {
  const handleCategory = value => {
    setCategory(value);
  };
  return (
    <div
      onClick={() => handleCategory(content)}
      className={`text-center border-2 border-semi_primary rounded-lg py-1 hover:shadow-xl ease-in-out duration-300 cursor-pointer ${
        category === content ? 'bg-primary text-white border-transparent' : ''
      }`}
    >
      <span className="font-semibold">{content}</span>
    </div>
  );
}
