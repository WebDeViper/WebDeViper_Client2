import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { useDispatch } from 'react-redux';
import { profileUser } from '../../reducers/thunkFunctions';
import { useNavigate } from 'react-router-dom';
import Category from './Category';
import NickName from './NickName';

export default function SignInPage() {
  const [category, setCategory] = useState();
  const [nickName, setNickName] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(true);
  const [isValidate, setIsValidate] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 유저 정보 수정
  const handleUserInfo = () => {
    if (isDuplicate && !category) {
      alert('중복 체크 및 카테고리 선택을 해주세요!');
    } else if (isDuplicate) {
      alert('중복체크를 해주세요!');
    } else if (!category) {
      alert('카테고리 선택을 해주세요!');
    } else {
      dispatch(profileUser({ category: category[0], nickName: nickName }));
      alert(`환영합니다 ${nickName}님!`);
      navigate('/');
    }
  };
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="titleWrap flex justify-between mb-10">
        <h1 className="font-bold text-3xl underline underline-offset-8 decoration-sky-500">카테고리 및 닉네임 설정</h1>
        {isValidate && !isDuplicate && category.length > 0 && (
          <Button
            handleClick={handleUserInfo}
            customStyle={`border-2 p-3 self-end bg-transparent !text-primary border-primary border-2 text-lg`}
          >
            완료
          </Button>
        )}
      </div>
      <NickName
        nickName={nickName}
        setNickName={setNickName}
        isDuplicate={isDuplicate}
        setIsDuplicate={setIsDuplicate}
        isValidate={isValidate}
        setIsValidate={setIsValidate}
      />
      <Category category={category} setCategory={setCategory} />
    </div>
  );
}
