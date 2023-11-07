import React, { useEffect, useState } from 'react';
import { API } from '../../../utils/axios';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';

export default function StudyGroup() {
  const [studyGroup, setStudyGroup] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getGroupData = async () => {
      try {
        const response = await API.get('/group/studyGroups');
        console.log('카테고리 같은 스터디그룹 리스트 >>', response.data);
        const data = await response.data;
        setStudyGroup(data.study_groups);
      } catch (err) {
        console.error(err, '에러!!!!!!@#!@#@!#');
      }
    };
    getGroupData();
  }, []);
  const handleCreateGroup = () => {
    navigate('/group/create');
  };
  const groupRequest = async groupId => {
    try {
      console.log('그룹아이디는', groupId);
      const res = await API.post(`/group/studyGroup/${groupId}/join`);
      console.log('상태코드는', res.status);

      if (!res.data.isFull) {
        console.log('그룹신청완료 >>', res.data);
        const data = res.data.message;
        return alert(data);
      } else {
        alert(`${res.data.message}`);
      }
    } catch (err) {
      console.error(err.message);
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <section className="mt-11">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">스터디 그룹</h2>
        <Button customStyle="rounded-lg" handleClick={handleCreateGroup}>
          스터디 그룹 추가
        </Button>
      </div>
      <div>
        {studyGroup?.map((item, index) => (
          <div key={index}>
            {console.log(item)}
            {item.group_name}
            <Button customStyle="rounded-lg" handleClick={() => groupRequest(item._id)}>
              그룹신청
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
