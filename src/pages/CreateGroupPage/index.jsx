import React, { useRef, useState } from 'react';
import Button from '../../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../utils/axios';
import GroupImage from './GroupImage';
import GroupInfo from './GroupInfo';
// import './index.css';
import GroupCategory from './GroupCategory';
import GroupTargetTime from './GroupTargetTime';
// import './index.css';

export default function CreateGroupPage() {
  const checkboxRef = useRef();
  const navigate = useNavigate();

  const [groupInfo, setGroupInfo] = useState({
    name: '',
    description: '',
    category: '',
    dailyGoalTime: null,
    maximumNumberMember: null,
    isCameraOn: false,
    imagePath: '',
  });

  const [images, setImages] = useState([]);

  const handleChangeInput = (e, key) => {
    setGroupInfo({ ...groupInfo, [key]: e.target.value });
  };

  const handleCreateGroup = async () => {
    const formData = new FormData();

    // groupInfo 데이터를 FormData에 추가
    for (const key in groupInfo) {
      formData.append(key, groupInfo[key]);
    }

    // 이미지 파일이 존재하는 경우 FormData에 추가
    if (images[0]) {
      formData.append('groupImgFile', images[0].file);
    }

    // 요청
    try {
      const res = await API.post('/group/studyGroup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data) {
        alert('그룹 생성 완료');
        navigate('/');
      }
    } catch (error) {
      console.error('그룹 생성 실패:', error);
    }
  };

  return (
    <div className="createGroupWrap flex flex-col justify-center">
      <div className="groupHeader mb-5 flex justify-between items-center">
        <h2 className="font-bold text-2xl">스터디 그룹 생성</h2>
        <div className="buttonWrap self-end">
          <Button customStyle={''} handleClick={handleCreateGroup}>
            생성
          </Button>
        </div>
      </div>
      <div className="groupTop flex lg:flex-row xs:flex-col mb-5">
        <GroupImage groupInfo={groupInfo} setGroupInfo={setGroupInfo} images={images} setImages={setImages} />
        <GroupInfo handleChangeInput={handleChangeInput} groupInfo={groupInfo} setGroupInfo={setGroupInfo} />
      </div>
      <div className="groupBot flex w-full justify-between self-center px-10">
        <GroupCategory groupInfo={groupInfo} setGroupInfo={setGroupInfo} />
        <GroupTargetTime groupInfo={groupInfo} setGroupInfo={setGroupInfo} />
        <label className="switch flex w-fit justify-center items-center">
          <span className="text-xl font-bold me-3">줌 여부</span>
          <input
            type="checkbox"
            ref={checkboxRef}
            onChange={e => setGroupInfo({ ...groupInfo, isCameraOn: e.target.checked })}
          />
        </label>
      </div>
    </div>
  );
}
