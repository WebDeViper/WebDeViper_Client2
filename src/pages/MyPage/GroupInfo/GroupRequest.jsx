import React from 'react';

export default function GroupRequest({ myOwnGroup }) {
  return (
    <div className="border-2 h-48 mb-5">
      {myOwnGroup.map(group => group.join_requests.map(request => <div>{request.user_id}</div>))}
    </div>
  );
}
