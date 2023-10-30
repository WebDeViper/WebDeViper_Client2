import React from 'react';
import CategoryGroup from './CategoryGroup';

export default function CategoryPage() {
  return (
    <div>
      <CategoryGroup title={'학생'} />
      <CategoryGroup title={'공무원'} />
    </div>
  );
}
