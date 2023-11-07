import React, { useEffect, useState } from 'react';
import GroupRequest from './GroupRequest';
import MyGroupRequest from './MyGroupRequest';
import { API } from '../../../utils/axios';
import { useSelector } from 'react-redux';

export default function GroupInfo() {
  const loginUserId = useSelector(state => state.user?.userInfo?.id);
  const [myOwnGroup, setMyOwnGroup] = useState([]);
  const [myPendingGroup, setMyPendingGroup] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const res = await API.get('/group/studyGroups/users');
      console.log(res.data);
      const filteredGroup = res.data.study_groups;
      setMyOwnGroup(filteredGroup);
    };
    const getMyReqGroups = async () => {
      const res = await API.get('/user');
      console.log('제발 이것만~~', res.data);
    };
    getGroups();
    getMyReqGroups();
  }, []);
  console.log('내 그룹', myOwnGroup);

  return (
    <div>
      <h2 className="font-bold text-xl mb-5">그룹 가입 요청</h2>
      <div className="myOwnGroupWrap flex md:flex-row flex-col flex-wrap gap-1">
        {myOwnGroup.map(
          group =>
            group.join_requests.length > 0 && (
              <GroupRequest
                key={group._id}
                requests={group.join_requests}
                groupName={group.group_name}
                groupId={group._id}
              />
            )
        )}
      </div>
      <div className="myPendingGroupWrap">
        <h2 className="font-bold text-xl mb-5">신청중인 그룹</h2>

        {/* map 돌려서 그룹 어쩌구~~~ */}
        <MyGroupRequest />
      </div>

    </div>
  );
}
