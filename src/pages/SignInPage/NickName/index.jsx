import React, { useEffect, useState } from 'react';
// import Button from '../../../components/common/Button';
import { API } from '../../../utils/axios';

export default function NickName({ nickName, setNickName, isDuplicate, setIsDuplicate, isValidate, setIsValidate }) {
  const [message, setMessage] = useState('');
  const handleCheckDuplicate = async () => {
    // 중복체크
    const res = await API.get(`/user/nick/${nickName}/duplicateCheck`);
    setMessage(!res.data ? '사용 가능' : '닉네임 중복');
    setIsDuplicate(!res.data ? false : true);
  };
  const handleInputChange = e => {
    const inputNick = e.target.value;
    // console.log(inputNick.trim().length);
    inputNick.trim() ? setNickName(inputNick) : setNickName('');
    if (!inputNick) {
      setMessage('');
    } else {
      checkValidate(inputNick);
    }
  };

  const checkValidate = input => {
    const pattern = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,10}$/;
    if (!pattern.test(input.trim())) {
      setMessage('닉네임은 한글, 영문, 숫자를 포함한 2~10자 이하입니다!');
      setIsValidate(false);
    } else {
      setMessage('');
      setIsValidate(true);
    }
  };
  useEffect(() => {}, [nickName]);
  console.log('닉네임 상태>>>', nickName);

  // input에서 엔터로 중복체크
  const handleKeyDown = e => {
    if (e.code === 'Enter') {
      isValidate ? handleCheckDuplicate() : '';
    }
  };
  const messageStyled = !isDuplicate && isValidate ? 'text-primary' : 'text-red-600';
  const buttonStyled = isValidate ? '!bg-primary' : '!bg-gray-500';
  return (
    <div className="nickContainer mb-10 flex flex-wrap gap-3 justify-start items-center">
      <div className="nickTitle">
        <h2 className="font-bold text-2xl">닉네임을 설정해보세요!</h2>
        <span className="text-gray-500">한글, 영문(대소문자), 숫자 조합 / 2~10자 이하</span>
      </div>
      <div className="nickInputWrap border-2 rounded-lg border-primary ps-5 pe-2 w-fit flex items-center">
        <input
          className="font-bold w-[10rem] h-[3rem] border-transparent focus:ring-0 focus:border-transparent"
          type="text"
          placeholder="닉네임 입력"
          // value={nickName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {/* <Button handleClick={handleCheckDuplicate}>중복체크</Button> */}
        <button
          className={`text-white w-fit text-sm leading-6 font-bold tracking-wider py-[5px] px-2.5 rounded-lg ${buttonStyled}`}
          onClick={handleCheckDuplicate}
          disabled={isValidate ? false : true}
        >
          중복체크
        </button>
      </div>
      {message && <span className={`font-semibold md:ms-5 ${messageStyled}`}>{message}</span>}
    </div>
  );
}
