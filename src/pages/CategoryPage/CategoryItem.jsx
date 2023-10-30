import React, { useRef, useState } from 'react';

export default function CategoryItem({ content, selectedCategory, setSelectedCategory }) {
  const categoryRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const handleCategory = () => {
    // console.log(categoryRef.current.innerText);
    const categoryContent = categoryRef.current.innerText;
    const isSelected = selectedCategory.includes(categoryContent);
    if (isSelected) {
      setSelectedCategory(selectedCategory.filter(category => category !== categoryContent));
    } else {
      setSelectedCategory([...selectedCategory, categoryContent]);
    }
    setIsActive(!isActive);
  };

  const containerClass = `text-center border-2 rounded-lg py-1 ${isActive ? 'bg-primary text-white' : ''}`;

  return (
    <div onClick={handleCategory} ref={categoryRef} className={containerClass}>
      {content}
    </div>
  );
}
