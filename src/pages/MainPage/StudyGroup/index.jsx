import React, { useEffect, useState } from 'react';
import { API } from '../../../utils/axios';
import axios from 'axios';
import Button from '../../../components/common/Button';

export default function StudyGroup() {
  const [studyGroup, setStudyGroup] = useState();
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
  return (
    <section className="mt-11">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">스터디 그룹</h2>
        <Button customStyle="rounded-lg">스터디 그룹 추가</Button>
      </div>
      <div>
        {studyGroup?.map(item => (
          <div key={item.group_id}>{item.name}</div>
        ))}
      </div>
    </section>
  );
}
