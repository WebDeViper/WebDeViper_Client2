import React, { useEffect, useState } from 'react';
import GroupRequest from './GroupRequest';
import MyGroupRequest from './MyGroupRequest';
import { API } from '../../../utils/axios';
import { useSelector } from 'react-redux';

export default function GroupInfo() {
  const loginUserId = useSelector(state => state.user?.userInfo?.id);
  const [myOwnGroup, setMyOwnGroup] = useState([]);
  useEffect(() => {
    const getGroups = async () => {
      const res = await API.get('/group/studyGroups/users');
      console.log(res.data);
      const filteredGroup = res.data.study_groups;
      setMyOwnGroup(filteredGroup);
    };
    getGroups();
  }, []);
  console.log('내 그룹', myOwnGroup);

  return (
    <div>
      <GroupRequest myOwnGroup={myOwnGroup} />
      <MyGroupRequest />
    </div>
  );
}
