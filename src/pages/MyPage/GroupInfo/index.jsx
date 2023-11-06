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
      <div className="myOwnGroupWrap">
        <h2 className="font-bold text-xl mb-5">그룹 가입 요청</h2>
        {myOwnGroup.map(group => (
          <GroupRequest
            key={group._id}
            requests={group.join_requests}
            groupName={group.group_name}
            groupId={group._id}
          />
        ))}
      </div>
      <MyGroupRequest />
    </div>
  );
}
