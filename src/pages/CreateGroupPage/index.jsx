import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../utils/axios';
import GroupImage from './GroupImage';
import GroupInfo from './GroupInfo';
import './index.css';
import GroupCategory from './GroupCategory';
import GroupTargetTime from './GroupTargetTime';

// import { useDispatch } from 'react-redux';
// import { createGroup } from '../../reducers/thunkFunctions';
// import axios from 'axios';
// import './index.css';

export default function CreateGroupPage() {
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
    imagePath: '',
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
      <h2 className="font-bold text-2xl">스터디 그룹 생성</h2>
      <div className="buttonWrap self-end">
        <Button handleClick={handleCreateGroup}>확인</Button>
        <Link to={'/'}>
          <Button>취소</Button>
        </Link>
      </div>
      <div className="groupTop flex mb-5">
        <GroupImage groupInfo={groupInfo} setGroupInfo={setGroupInfo} />
        <GroupInfo handleChangeInput={handleChangeInput} groupInfo={groupInfo} setGroupInfo={setGroupInfo} />
      </div>
      <div className="groupBot flex flex-col justify-between self-center">
        <GroupCategory groupInfo={groupInfo} setGroupInfo={setGroupInfo} />

        {/* 드롭다운 */}
        <GroupTargetTime groupInfo={groupInfo} setGroupInfo={setGroupInfo} />

        {/* 드롭다운 */}
      </div>
    </div>
  );
}
