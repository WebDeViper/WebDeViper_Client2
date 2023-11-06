import React from 'react';
import EditCategory from './EditCategory';
import EditNickName from './EditNickName';
import EditProfileImage from './EditProfileImage';

export default function UserInfo() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <EditProfileImage />
      <div className="right-container">
        <EditNickName />
        <EditCategory />
      </div>
    </div>
  );
}
