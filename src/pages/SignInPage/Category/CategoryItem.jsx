import React, { useRef, useState } from 'react';

export default function CategoryItem({ content, category, setCategory }) {
  const categoryRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const handleCategory = () => {
    // console.log(categoryRef.current.innerText);
    const categoryContent = categoryRef.current.innerText;
    const isSelected = category.includes(categoryContent);
    if (isSelected) {
      setCategory(category.filter(category => category !== categoryContent));
    } else {
      setCategory([...category, categoryContent]);
    }
    setIsActive(!isActive);
  };

  const containerClass = `text-center border-2 border-semi_primary rounded-lg py-1 hover:shadow-xl ease-in-out duration-300 ${
    isActive ? 'bg-primary text-white border-transparent' : ''
  }`;

  return (
    <div onClick={handleCategory} ref={categoryRef} className={containerClass}>
      <span className="font-semibold">{content}</span>
    </div>
  );
}
