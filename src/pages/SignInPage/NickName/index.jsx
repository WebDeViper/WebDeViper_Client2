import React, { useState } from 'react';
import Button from '../../../components/common/Button';
import { API } from '../../../utils/axios';

export default function NickName({ nickName, setNickName }) {
  const [message, setMessage] = useState('');
  const handleCheckDuplicate = async () => {
    // 중복체크
    const res = await API.get(`/user/nick/${nickName}/duplicateCheck`);
    // const res = { data: true };
    setMessage(!res.data ? '사용 가능' : '닉네임 중복');
  };
  const handleInputChange = e => {
    setNickName(e.target.value);
    setMessage('');
  };
  const handleBlur = () => {
    const pattern = /^[A-Za-z0-9가-힣]{2,10}$/;
    if (!pattern.test(nickName)) {
      setMessage('닉네임은 한글, 영문, 숫자를 포함한 2~10자 이하입니다!');
    }
  };
  const styled = message === '사용 가능' ? 'text-primary' : 'text-red-600';
  return (
    <div className="nickContainer mb-10 flex justify-start items-center">
      <div className="nickTitle me-3">
        <h2 className="font-bold text-2xl">닉네임을 설정해보세요!</h2>
        <span className="text-gray-500">한글, 영문(대소문자), 숫자 조합 / 2~10자 이하</span>
      </div>
      <div className="nickInputWrap border-2 rounded-lg border-primary ps-5 pe-2 w-fit flex items-center">
        <input
          className="font-bold w-[10rem] h-[3rem] focus:outline-none"
          type="text"
          placeholder="닉네임 입력"
          value={nickName}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <Button handleClick={handleCheckDuplicate}>중복체크</Button>
      </div>
      {message && <span className={`font-semibold ms-5 ${styled}`}>{message}</span>}
    </div>
  );
}
