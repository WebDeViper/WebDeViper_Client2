import React from 'react';

export default function UserRank({ userTop3, userOther }) {
  return (
    <div className="userRankingWrap mb-5">
      <div className="userRanking">
        <div className="top3 flex md:flex-row flex-col md:justify-evenly md:mb-5">
          {userTop3.map((user, index) => (
            <div
              key={index}
              className="flex justify-between md:items-center xs:w-1/4 mb-3 border-2 rounded-lg py-2 px-10"
            >
              <div className="userImg">
                <img
                  className="w-20 h-20"
                  src={import.meta.env.VITE_APP_BACK_URL + user.user_profile_image_path}
                  alt=""
                />
              </div>
              <div className="userInfoWrap flex flex-col items-center">
                <span>{index + 1}등</span>
                <span className="font-bold">{user.user_nickname}</span>
                <span>{user.user_total_time ? user.user_total_time : '00:00:00'}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="other flex flex-col gap-2">
          {userOther.map(user => (
            <div
              key={user.user_nickname}
              className="h-20 md:max-w-full flex border-2 items-center rounded-lg gap-2 p-4"
            >
              <img
                src={import.meta.env.VITE_APP_BACK_URL + user.user_profile_image_path}
                alt="유저 이미지"
                className="h-full rounded-lg"
              />
              <span className="font-bold">{user.user_nickname}</span>
              <span>{user.user_total_time || '00:00:00'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
