import React from 'react';

export default function Main({ children }) {
  return (
    <div className="flex-1 mt-5 mb-20">
      <main>{children}</main>
    </div>
  );
}
