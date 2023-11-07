import React, { useState } from 'react';
import DropDown from '../../../components/common/DropDown';
import Button from '../../../components/common/Button';
import { profileUser } from '../../../reducers/thunkFunctions';
import categories from '../../../data/category';

const items = [...categories.student, ...categories.worker, ...categories.etc];

export default function EditCategory({ dispatch }) {
  const [category, setCategory] = useState(null);
  const handleClick = cate => setCategory(cate);
  const handleChangeCategory = () => {
    dispatch(profileUser({ category: category }));
    alert('카테고리 변경 완료!');
    location.reload();
  };

  return (
    <div className="flex flex-col items-end justify-center border-2 rounded-lg border-semi_primary p-2">
      <h2 className="font-bold text-2xl mb-5 self-start">카테고리 변경</h2>
      <div className="flex">
        <DropDown
          title={category ? category : '카테고리 선택'}
          items={items}
          styles={'font-bold text-xl'}
          handleClick={handleClick}
        ></DropDown>
        <Button
          customStyle={'!bg-transparent !border-primary border-2 !text-primary ms-2'}
          handleClick={handleChangeCategory}
        >
          완료
        </Button>
      </div>
    </div>
  );
}
