import React, { useRef } from 'react';

export default function GroupInfo({ handleChangeInput, groupInfo, setGroupInfo }) {
  const checkboxRef = useRef();

  return (
    <div className="groupInfo w-full flex flex-col">
      <input
        className="mb-2 text-center border-2 border-primary py-2 font-semibold rounded-lg"
        type="text"
        placeholder={'그룹명'}
        onChange={e => handleChangeInput(e, 'name')}
      />
      <input
        className="mb-2 text-center border-2 border-primary py-2 font-semibold rounded-lg"
        type="text"
        placeholder={'그룹설명'}
        onChange={e => handleChangeInput(e, 'description')}
      />
      <input
        className="mb-2 text-center border-2 border-primary py-2 font-semibold rounded-lg"
        type="password"
        placeholder={'비밀번호'}
        onChange={e => handleChangeInput(e, 'password')}
      />
      <input
        className="mb-2 text-center border-2 border-primary py-2 font-semibold rounded-lg"
        type="number"
        placeholder={'모집인원'}
        onChange={e => handleChangeInput(e, 'maximumNumberMember')}
      />
      <label className="switch">
        줌 여부
        <input
          type="checkbox"
          ref={checkboxRef}
          onChange={e => setGroupInfo({ ...groupInfo, isCameraOn: e.target.checked })}
        />
        {/* <span className="slider round"></span> */}
      </label>
      {/* <p>ㅇㅇ</p> */}
    </div>
  );
}
