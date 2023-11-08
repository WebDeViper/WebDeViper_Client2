import React from 'react';

export default function GroupRank({ groupTop3, groupOther }) {
  return (
    <div className="groupRankingWrap">
      <div className="groupRanking">
        <div className="top3 flex md:flex-row flex-col md:justify-evenly md:mb-5">
          {groupTop3.map((group, index) => (
            <div
              key={index}
              className="flex justify-center md:items-center sm:w-1/4 mb-3 border-2 rounded-lg py-2 px-10"
            >
              <div className="groupInfoWrap flex flex-col items-center">
                <span>{index + 1}등</span>
                <span className="font-bold">{group.group_name}</span>
                <span>{group.groupTotalTime ? group.groupTotalTime : '00:00:00'}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="other flex flex-col gap-2">
          {groupOther?.map(group => (
            <div
              key={Math.random() * 1000000000000}
              className="h-20 md:max-w-full flex border-2 items-center rounded-lg gap-2 p-4"
            >
              <img
                // src={import.meta.env.VITE_APP_BACK_URL + '그룹 이미지 경로'}
                alt="그룹 이미지"
                className="h-full rounded-lg"
              />
              <span className="font-bold">{group.group_name}</span>
              <span>{group.averageTime || '00:00:00'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
