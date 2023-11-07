import React, { useCallback, useEffect, useState } from 'react';
import { API, BACK } from '../../utils/axios';
import { useSelector } from 'react-redux';
import { Dropdown } from 'flowbite-react';

const items = ['경찰', '소방관', '군인', '초등학생', '중학생', '고등학생', '등등'];

export default function RankingPage() {
  const [rankList, setRankList] = useState([]);
  const [category, setCategory] = useState(null);

  const get = async () => {
    const res = await BACK.get('/ranking');
    console.log('랭킹 데이터>>', res.data);
    const { topUsers, topGroups } = res.data;
    setRankList(topUsers);
  };

  const getCategory = useCallback(async () => {
    const res = await BACK.get(`/ranking?category=${category}`);
    setRankList(res.data.topUsers);
  }, [category]);

  const handleChangeCategory = () => {
    console.log('카테고리 변경!!');
  };

  useEffect(() => {
    get();
    getCategory();
  }, []);

  return (
    <div className="rankingWrap flex flex-col">
      랭킹페이지 드가쟈~~~
      <div className="title flex mb-3">
        <h2 className="font-bold text-2xl">랭킹</h2>
        <Dropdown renderTrigger={() => <span>{category ? category : '카테고리 선택'}</span>}>
          {items.map((item, index) => (
            <Dropdown.Item onClick={handleChangeCategory} key={index}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown>
        <span>{category}</span>
      </div>
      <div className="body">
        <div className="top3 flex justify-evenly">
          {rankList?.map((user, index) => {
            return (
              <div key={index} className="flex flex-col items-center">
                <span className="font-bold">{index + 1}등</span>
                <span>{user.user_nickname}</span>
                <span>시간: {user.user_total_time || '00:00:00'}</span>
              </div>
            );
          })}
        </div>
        <div className="other"></div>
      </div>
    </div>
  );
}
