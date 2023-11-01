import React, { useEffect, useState } from 'react';
import { API } from '../../../utils/axios';
import axios from 'axios';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';

export default function StudyGroup() {
  const [studyGroup, setStudyGroup] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getGroupData = async () => {
      try {
        const response = await API.get('/group/studyGroups');
        const data = await response.data;
        setStudyGroup(data.study_groups);
      } catch (err) {
        console.error(err);
      }
    };
    getGroupData();
  }, []);
  const handleCreateGroup = () => {
    navigate('/group/create');
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
        {studyGroup?.map(item => (
          <div key={item.group_id}>{item.name}</div>
        ))}
      </div>
    </section>
  );
}
