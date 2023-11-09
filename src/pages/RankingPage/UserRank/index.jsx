import React from 'react';

export default function UserRank({ userRanking, calculateTime }) {
  return (
    <div className="userRankingWrap mb-5">
      <div className="userRanking">
        <div className="top3 flex gap-3 md:flex-row flex-col md:justify-evenly md:mb-5">
          {userRanking?.slice(0, 3)?.map((user, index) => (
            <div
              key={index}
              className={`rank${
                index + 1
              } flex justify-between md:items-center sm:w-1/3 mb-3 shadow-xl rounded-lg py-2`}
            >
              <div className="w-1/2 flex justify-center">
                <img
                  className="w-3/4 h-full rounded-lg"
                  src={import.meta.env.VITE_APP_BACK_URL + user.user_profile_image_path}
                  alt="유저 이미지"
                />
              </div>
              <div className="userInfoWrap flex md:flex-col w-1/2 gap-5 lg:gap-0 items-center">
                <span className="font-extrabold text-lg">{index + 1}등</span>
                <span className="font-bold">{user.user_nickname}</span>
                <span>{user.user_total_time ? calculateTime(user.user_total_time) : '00:00:00'}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="other flex flex-col gap-2">
          {userRanking?.slice(3)?.map(user => (
            <div
              key={user.user_nickname}
              className="h-20 md:max-w-full flex shadow-lg items-center rounded-lg gap-2 p-4"
            >
              <img
                src={import.meta.env.VITE_APP_BACK_URL + user.user_profile_image_path}
                alt="유저 이미지"
                className="h-full rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-bold">{user.user_nickname}</span>
                <span>{user.user_total_time ? calculateTime(user.user_total_time) : '00:00:00'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
