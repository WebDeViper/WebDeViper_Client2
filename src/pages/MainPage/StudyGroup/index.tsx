import React, { useEffect, useState } from 'react';
import { API } from '../../../utils/axios';

export default function StudyGroup() {
  const [studyGroup, setStudyGroup] = useState<Group[]>();
  useEffect(() => {
    const getGroupData = async () => {
      try {
        const response = await API.get('/group/studyGroups');
        console.log(response);
        const data = await response.data;
        setStudyGroup(data);
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
        <button className="bg-primary">스터디 그룹 추가</button>
      </div>
      <div>
        {studyGroup?.map(item => (
          <div>{item.name}</div>
        ))}
      </div>
    </section>
  );
}
