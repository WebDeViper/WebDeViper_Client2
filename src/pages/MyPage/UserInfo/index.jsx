import React from 'react';
import EditCategory from './EditCategory';
import EditNickName from './EditNickName';
import EditProfileImage from './EditProfileImage';
import { useDispatch } from 'react-redux';

export default function UserInfo() {
  const dispatch = useDispatch();

  return (
    <div className="myPage-userInfo flex flex-col md:flex-row justify-between items-center mb-5 md:gap-1">
      <EditProfileImage />
      <div className="myPage-userInfo-right-container w-full">
        <EditNickName dispatch={dispatch} />
        <EditCategory dispatch={dispatch} />
      </div>
    </div>
  );
}
