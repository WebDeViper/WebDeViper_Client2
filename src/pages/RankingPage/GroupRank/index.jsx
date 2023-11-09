import React from 'react';

export default function GroupRank({ groupRanking }) {
  return (
    <div className="groupRankingWrap">
      <div className="top3 flex md:flex-row flex-col md:justify-between md:mb-5">
        {groupRanking?.slice(0, 3)?.map((group, index) => (
          <div
            key={index}
            className="flex md:justify-between md:items-center md:w-1/4 mb-3 border-2 rounded-lg py-2 px-5"
          >
            <div className="groupImg w-full">
              <img
                className="w-20 h-20 rounded-lg"
                src={import.meta.env.VITE_APP_BACK_URL + group.group_image_path}
                alt="그룹 이미지"
              />
            </div>
            <div className="groupInfoWrap flex flex-col items-center w-full">
              <span>{index + 1}등</span>
              <span className="font-bold">
                {group.group_name.slice(0, 8) + (group.group_name.length > 8 ? '...' : '')}
              </span>
              <span>{group.groupTotalTime ? group.groupTotalTime : '00:00:00'}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="other flex flex-col gap-2">
        {groupRanking?.slice(3)?.map(group => (
          <div
            key={Math.random() * 1000000000000}
            className="h-20 md:max-w-full flex border-2 items-center rounded-lg gap-2 p-4"
          >
            <img
              src={import.meta.env.VITE_APP_BACK_URL + group.group_image_path}
              alt="그룹 이미지"
              className="h-full rounded-lg"
            />
            <span className="font-bold">{group.group_name}</span>
            <span>{group.averageTime || '00:00:00'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
