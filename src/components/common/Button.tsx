import React from 'react';

interface Props {
  children: React.ReactNode;
  customStyle?: string;
  handleClick?: () => void;
}

export default function Button({ children, customStyle, handleClick }: Props) {
  const styled = customStyle || '';
  return (
    <button
      className={`bg-primary text-white text-sm leading-6 font-bold tracking-wider py-[5px] px-2.5 ${styled}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
