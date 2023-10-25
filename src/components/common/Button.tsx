import React from 'react';

interface Props {
  children: React.ReactNode;
  customStyle?: string;
  handleClick?: () => void;
}

export default function Button({ children, customStyle, handleClick }: Props) {
  return (
    <button
      className={`bg-primary text-white text-sm leading-6 font-bold tracking-wider py-[5px] px-2.5 ${customStyle}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
