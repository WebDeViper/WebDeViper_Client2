import React, { useCallback, useEffect, useState } from 'react';
import { API } from '../../utils/axios';
import categories from '../../data/category';
import DropDown from '../../components/common/DropDown';
import { useSelector } from 'react-redux';
import UserRank from './userRank';
import GroupRank from './groupRank';

const items = [...categories.student, ...categories.worker, ...categories.etc];

export default function RankingPage() {
  // 디폴트로 보여주기 위해 로그인한 유저가 속한 카테고리 선택
  const userCategory = useSelector(state => state.user?.userInfo?.category);
  // 카테고리 변경, top3, top3제외 를 관리하기 위한 state
  const [category, setCategory] = useState(null);
  const [top3, setTop3] = useState({});
  const [other, setOther] = useState({});

  // console.log('뭐지??', top3, other);

  // 처음 들어왔을 때 디폴트 카테고리로 조회한 결과 보여주기
  const getFirstRank = async () => {
    const res = await API.get('/ranking');
    console.log('처음 마운트 시 랭킹 데이터 >>', res.data);
    // const { topUsers, topGroups } = res.data;
    setTop3({ userTop3: res.data.topUsers?.slice(0, 3), groupTop3: res.data.topGroups?.slice(0, 3) });
    setOther({ userOther: res.data.topUsers?.slice(3), groupOther: res.data.topGroups?.slice(3) });
  };

  // 카테고리별 탑텐 요청하는 함수.. 카테고리 바뀔때만 함수 재정의(useCallback)
  const getCategory = useCallback(async () => {
    // 바뀐 카테고리에 해당하는 랭킹 데이터 요청
    const res = await API.get(`/ranking?category=${category}`);
    console.log('카테고리 변경 후 응답 결과 >> ', res.data);
    // 유저와 그룹으로 구조분해
    const { topUsers, topGroups } = res.data;
    // 응답 결과로 top3, 나머지 state 업데이트
    setTop3(topUsers ? { userTop3: topUsers.slice(0, 3), groupTop3: res.data.topGroups?.slice(0, 3) } : {});
    setOther(topGroups ? { userOther: res.data.topUsers.slice(3), groupOther: res.data.topGroups?.slice(3) } : {});
  }, [category]);

  // 카테고리 선택 시 category state 업데이트
  const handleChangeCategory = cate => {
    console.log('바뀐 카테고리>>', cate);
    setCategory(cate);
  };

  useEffect(() => {
    getFirstRank();
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
          title={category ? category : userCategory}
          items={items}
          styles={'font-bold text-lg'}
          handleClick={handleChangeCategory}
        ></DropDown>
      </div>
      <UserRank userTop3={top3.userTop3} userOther={other.userOther} />
      <GroupRank groupTop3={top3.groupTop3} groupOther={other.groupOther} />
    </div>
  );
}
