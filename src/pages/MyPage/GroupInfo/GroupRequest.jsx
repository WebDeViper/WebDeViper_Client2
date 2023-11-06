import React from 'react';
import { API } from '../../../utils/axios';

export default function GroupRequest({ requests, groupName, groupId }) {
  const handleAccept = async requestName => {
    console.log('수락!!!', requests);
    console.log(requestName);
    const res = await API.post(`/group/studyGroup/${groupId}/${requestName}/requests/accept`);
    console.log(res.data, '수락 응답!!');
  };
  const handleReject = async requestName => {
    console.log('거절!!!');
    const res = await API.post(`/group/studyGroup/${groupId}/${requestName}/requests/reject`);
    console.log(res.data, '거절 응답!!');
  };
  return (
    <div className="mb-5 flex flex-col w-fit h-fit gap-2 border-2 rounded-lg border-primary p-2">
      <span className="bg-blue-100 text-blue-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 h-fit">
        {groupName}
      </span>
      {requests.map(request => (
        <div key={request._id} className="flex flex-col justify-center w-fit gap-2">
          <div className="request-right flex text-sm items-center gap-3">
            <div>{request.user_name}</div>
            <div className="btnWrap flex gap-1">
              <button
                className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                onClick={() => handleAccept(request.user_name)}
              >
                수락
              </button>
              <button
                className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
                onClick={() => handleReject(request.user_name)}
              >
                삭제
              </button>
            </div>
          </div>
          {/* <div className="request-right flex text-sm items-center gap-3">
            <div>{request.user_name}</div>
            <div className="btnWrap flex gap-1">
              <button className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                수락
              </button>
              <button className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                삭제
              </button>
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
}
