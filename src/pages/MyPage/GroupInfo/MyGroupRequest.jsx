import React from 'react';

// const ex = {
//   _id: '6549195a76f889d485aa7845',
//   group_leader: '654916b4d5d56c93e8fdf78d',
//   group_name: '소방소방',
//   group_category: '소방관',
//   group_description: 'ㅎㅇㅎㅇ',
//   group_image_path: '/api/static/groupImg/defaultGroup.jpeg',
//   group_maximum_member: 2,
//   daily_goal_time: 'null',
//   is_camera_on: false,
//   members: ['654916b4d5d56c93e8fdf78d', '654916b4d5d56c93e8fdf78d', '654916496d5674be9114dc75'],
//   join_requests: [
//     {
//       user_id: '654916496d5674be9114dc75',
//       user_name: '태훈카카오1',
//       _id: '6549363173256282807010d7',
//     },
//   ],
//   __v: 4,
// };

export default function MyGroupRequest({ groupInfo }) {
  console.log('>>>>', groupInfo);
  const handleCancelRequest = () => {
    console.log('내가 신청중인 그룹 취소!!');
    // TODO: 그룹 신청 취소 api 연결
  };
  return (
    <div className="mb-5 flex flex-col items-center w-fit h-fit gap-2 border-2 rounded-lg border-primary p-2">
      <span className="bg-blue-100 text-blue-800 text-center text-lg font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 h-fit">
        {groupInfo.group_name}
      </span>
      <div className="request-body flex flex-col items-center w-fit gap-2">
        <div className="request-group-info flex text-sm items-center">
          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
            인원 {groupInfo.members.length} / {groupInfo.group_maximum_member}
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            {groupInfo.group_category}
          </span>
        </div>
        <button
          className="bg-red-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
          onClick={handleCancelRequest}
        >
          신청 취소
        </button>
      </div>
    </div>
  );
}
