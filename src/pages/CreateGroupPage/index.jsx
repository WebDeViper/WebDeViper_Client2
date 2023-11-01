import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../utils/axios';
// import { useDispatch } from 'react-redux';
// import { createGroup } from '../../reducers/thunkFunctions';
// import axios from 'axios';
// import './index.css';

export default function CreateGroupPage() {
  const checkboxRef = useRef();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [groupInfo, setGroupInfo] = useState({
    name: '',
    password: '',
    description: '',
    category: '',
    dailyGoalTime: null,
    maximumNumberMember: null,
    isCameraOn: false,
  });

  const handleChangeInput = (e, key) => {
    console.log(e.target.value);
    setGroupInfo({ ...groupInfo, [key]: e.target.value });
  };

  const handleCreateGroup = async () => {
    // dispatch(createGroup(groupInfo))
    const res = await API.post('/group/studyGroup', groupInfo);
    if (res.data) {
      alert('그룹 생성 완료');
      navigate('/');
    }
  };

  console.log(groupInfo);
  return (
    <div className="createGroupWrap flex flex-col justify-center">
      <div className="groupTop flex h-96">
        <div className="groupImg border-2">
          <input type="file" />
          <img src="" alt="그룹이미지" width={'500px'} />
        </div>
        <div className="groupInfo flex flex-col border-2">
          <input className="border-2" type="text" placeholder={'그룹명'} onChange={e => handleChangeInput(e, 'name')} />
          <input
            className="border-2"
            type="text"
            placeholder={'그룹설명'}
            onChange={e => handleChangeInput(e, 'description')}
          />
          <input
            className="border-2"
            type="password"
            placeholder={'비밀번호'}
            onChange={e => handleChangeInput(e, 'password')}
          />
          <input
            className="border-2"
            type="number"
            placeholder={'모집인원'}
            onChange={e => handleChangeInput(e, 'maximumNumberMember')}
          />
          <label className="switch">
            줌 여부
            <input type="checkbox" ref={checkboxRef} />
            {/* <span className="slider round"></span> */}
          </label>
          {/* <p>ㅇㅇ</p> */}
        </div>
      </div>
      <div className="groupBot border-2 h-96">
        <div className="groupCategory">카테고리</div>
        {/* 드롭다운 */}
        <div className="groupTargetTime">시간</div>
        {/* 드롭다운 */}
      </div>
      <div className="buttonWrap">
        <Button handleClick={handleCreateGroup}>확인</Button>
        <Link to={'/'}>
          <Button>취소</Button>
        </Link>
      </div>
    </div>
  );
}
