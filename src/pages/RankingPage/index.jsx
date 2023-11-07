import React, { useCallback, useEffect, useState } from 'react';
import { API } from '../../utils/axios';
import { Dropdown } from 'flowbite-react';
import categories from '../../data/category';
import DropDown from '../../components/common/DropDown';

const items = [...categories.student, ...categories.worker, ...categories.etc];

export default function RankingPage() {
  const [category, setCategory] = useState(null);
  const [userTop3, setUserTop3] = useState([]);
  const [userOther, setUserOther] = useState([]);

  // 처음 들어왔을 때 디폴트 카테고리로 조회한 결과 보여주기
  const get = async () => {
    const res = await API.get('/ranking');
    console.log('랭킹 데이터>>', res.data);
    const { topUsers, topGroups } = res.data;
    setUserTop3(topUsers.slice(0, 3));
    setUserOther(topUsers.slice(3));
  };

  // 카테고리별 탑텐 요청하는 함수.. 카테고리 바뀔때만 함수 재정의
  const getCategory = useCallback(async () => {
    const res = await API.get(`/ranking?category=${category}`);
    console.log(res.data, '이건 뭐야~~~~');
    const { topUsers, topGroups } = res.data;
    // 응답 결과로 top3, 나머지 state 업데이트
    setUserTop3(res.data.topUsers ? res.data.topUsers.slice(0, 3) : []);
    setUserOther(res.data.topUsers ? res.data.topUsers.slice(3) : []);
  }, [category]);

  // 카테고리 선택 시 category state 업데이트
  const handleChangeCategory = cate => {
    console.log('바뀐 카테고리>>', cate);
    setCategory(cate);
  };

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    getCategory();
    console.log('카테고리 변경!!', category);
  }, [category]);

  return (
    <div className="rankingWrap flex flex-col">
      랭킹페이지 드가쟈~~~
      <div className="title flex mb-3">
        <h2 className="font-bold text-2xl">랭킹</h2>
        <DropDown
          title={category ? category : '카테고리 선택'}
          items={items}
          styles={'font-bold text-xl'}
          handleClick={handleChangeCategory}
        ></DropDown>
        <span>{category}</span>
      </div>
      <div className="body">
        <div className="top3 flex justify-evenly">
          {userTop3.map((user, index) => (
            <div key={index} className="flex flex-col items-center">
              <span>{index + 1}등</span>
              <span className="font-bold">{user.user_nickname}</span>
              <span>{user.user_total_time ? user.user_total_time : '00:00:00'}</span>
            </div>
          ))}
        </div>
        <div className="other">
          {userOther.map((user, index) => (
            <div key={index} className="border-2">
              <span className="font-bold me-5">{user.user_nickname}</span>
              <span>{user.user_total_time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
