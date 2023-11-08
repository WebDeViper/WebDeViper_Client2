import React from 'react';
import { Card } from 'flowbite-react';

export default function GroupRank({ groupTop3, groupOther }) {
  return (
    <div className="groupRankingWrap">
      {!groupTop3?.length && <Card className="font-bold">아직 랭킹이 없어요!</Card>}
      <div className="groupRanking">
        <div className="top3 flex justify-evenly md:mb-5">
          {top3.groupTop3.map((group, index) => (
            <div key={index} className="flex justify-between items-center w-1/4 border-2 rounded-lg py-2 px-10">
              <div className="groupInfo flex flex-col items-center">
                <span>{index + 1}등</span>
                <span className="font-bold">{group.group_name}</span>
                <span>{group.groupTotalTime ? group.groupTotalTime : '00:00:00'}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="other flex flex-col gap-2">
          {groupOther?.map(group => (
            <div key={group._id} className="h-20 md:max-w-full flex border-2 items-center rounded-lg gap-2 p-4">
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
