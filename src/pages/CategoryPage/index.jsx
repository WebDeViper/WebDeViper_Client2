import React, { useState } from 'react';
import CategoryGroup from './CategoryGroup';
import Button from '../../components/common/Button';
import { useDispatch } from 'react-redux';
import { categoryUser } from '../../reducers/thunkFunctions';
import { useNavigate } from 'react-router-dom';

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentArr = ['초등학생', '중학생', '고등학생', '대학생'];
  const publicArr = ['경찰', '소방관', '행정고시', '군인'];
  const setCategory = () => {
    dispatch(categoryUser({ category: selectedCategory[0] }));
    navigate('/');
  };
  return (
    <div>
      <h2 className="font-bold text-2xl mb-8">카테고리 설정</h2>
      <div className="categoryWrap flex flex-col">
        <Button
          handleClick={setCategory}
          customStyle="border-2 p-3 mb-3 self-end bg-transparent !text-primary border-primary border-2"
        >
          완료
        </Button>
        <CategoryGroup
          title={'학생'}
          contentArr={studentArr}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <CategoryGroup
          title={'공무원'}
          contentArr={publicArr}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
}
