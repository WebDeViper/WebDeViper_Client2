import React, { useCallback, useEffect, useState } from 'react';
import { API } from '../../utils/axios';
import categories from '../../data/category';
import DropDown from '../../components/common/DropDown';
import { Card } from 'flowbite-react';

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
      <div className="title flex items-center mb-3">
        <h2 className="font-bold text-2xl me-2">랭킹</h2>
        <span>어제 기준 랭킹. ~~시마다 업데이트</span>
        {/* 초단위 */}
        <DropDown
          title={category ? category : '카테고리 선택'}
          items={items}
          styles={'font-bold text-lg'}
          handleClick={handleChangeCategory}
        ></DropDown>
      </div>
      {!userTop3.length && <Card className="font-bold">아직 랭킹이 없어요!</Card>}
      <div className="body">
        <div className="top3 flex justify-evenly md:mb-5">
          {userTop3.map((user, index) => (
            <div key={index} className="flex justify-between items-center w-1/4 border-2 rounded-lg py-2 px-10">
              <div className="userImg">
                <img
                  className="w-20 h-20"
                  src={import.meta.env.VITE_APP_BACK_URL + user.user_profile_image_path}
                  alt=""
                />
              </div>
              <div className="userInfo flex flex-col items-center">
                <span>{index + 1}등</span>
                <span className="font-bold">{user.user_nickname}</span>
                <span>{user.user_total_time ? user.user_total_time : '00:00:00'}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="other flex flex-col gap-2">
          {userOther.map((user, index) => (
            <Card
              // theme={{ theme: customTheme2 }}
              key={index}
              className="h-20 md:max-w-full"
              horizontal
              imgSrc={import.meta.env.VITE_APP_BACK_URL + user.user_profile_image_path}
            >
              <span className="font-bold">{user.user_nickname}</span>
              <span>{user.user_total_time || '00:00:00'}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const customTheme = {
  root: {
    base: 'flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800',
    children: 'flex h-full justify-center gap-4 p-6',
    horizontal: {
      off: 'flex-col',
      on: 'flex-col md:max-w-xl md:flex-row',
    },
    href: 'hover:bg-gray-100 dark:hover:bg-gray-700',
  },
  img: {
    base: '',
    horizontal: {
      off: 'rounded-t-lg',
      on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg',
    },
  },
};
