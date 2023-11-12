import React from 'react';

export default function Button({ children, customStyle, handleClick }) {
  const styled = customStyle || '';
  return (
    <button
      className={`bg-primary text-white w-fit text-sm leading-6 font-medium tracking-wider py-[5px] px-2.5 rounded-lg ${styled}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
