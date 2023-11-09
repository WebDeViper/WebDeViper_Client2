import React, { useCallback, useEffect, useState } from 'react';
import { API } from '../../utils/axios';
import categories from '../../data/category';
import DropDown from '../../components/common/DropDown';
import { useSelector } from 'react-redux';
import UserRank from './userRank';
import GroupRank from './groupRank';
import { Card, Badge } from 'flowbite-react';

const items = [...categories.student, ...categories.worker, ...categories.etc];

export default function RankingPage() {
  // 디폴트로 보여주기 위해 로그인한 유저가 속한 카테고리 선택
  const userCategory = useSelector(state => state.user?.userInfo?.category);
  // 카테고리 변경, top3, top3제외 를 관리하기 위한 state
  const [category, setCategory] = useState(null);
  const [groupRanking, setGroupRanking] = useState([]);
  const [userRanking, setUserRanking] = useState([]);

  // console.log('뭐지??', top3, other);

  // 처음 들어왔을 때 디폴트 카테고리로 조회한 결과 보여주기
  const getFirstRank = async () => {
    try {
      const res = await API.get('/ranking');
      console.log('처음 마운트 시 랭킹 데이터 >>', res.data);
      setRank(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 서버에서 응답받은 데이터로 랭킹 state 업데이트하는 함수
  const setRank = data => {
    const { topUsers, topGroups } = data;
    if (topUsers && topGroups) {
      setUserRanking(topUsers);
      setGroupRanking(topGroups);
    } else if (topUsers && !topGroups) {
      setUserRanking(topUsers);
      setGroupRanking([]);
    } else if (!topUsers && topGroups) {
      setUserRanking([]);
      setGroupRanking(topGroups);
    } else {
      setUserRanking([]);
      setGroupRanking([]);
    }
  };

  // 카테고리별 탑텐 요청하는 함수.. 카테고리 바뀔때만 함수 재정의(useCallback)
  const getCategory = useCallback(async () => {
    // 바뀐 카테고리에 해당하는 랭킹 데이터 요청
    try {
      const res = await API.get(`/ranking?category=${category}`);
      console.log('카테고리 변경 후 응답 결과 >> ', res.data);
      setRank(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [category]);

  // 카테고리 선택 시 category state 업데이트
  const handleChangeCategory = cate => {
    console.log('바뀐 카테고리>>', cate);
    setCategory(cate);
  };

  useEffect(() => {
    try {
      getFirstRank();
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    try {
      getCategory();
    } catch (err) {
      console.error(err);
    }
    console.log('카테고리 변경!!', category);
  }, [category]);

  return (
    <div className="rankingWrap flex flex-col">
      <div className="rankHeader flex flex-col justify-center mb-3">
        <div className="rankCategoryWrap flex items-center">
          <h2 className="font-bold text-2xl me-2">랭킹</h2>
          <Badge color="pink">어제 기준 랭킹 12시마다 업데이트</Badge>
        </div>
        {/* 초단위 */}
        <DropDown
          title={category ? category : userCategory}
          items={items}
          styles={'font-bold text-lg'}
          handleClick={handleChangeCategory}
        ></DropDown>
      </div>
      <div className="rankContent">
        <h3 className="font-semibold text-xl mb-3">유저 랭킹</h3>
        {userRanking.length > 0 ? (
          <UserRank userRanking={userRanking} />
        ) : (
          <Card className="font-bold mb-5">아직 랭킹이 없어요!</Card>
        )}
        <h3 className="font-semibold text-xl mb-3">그룹 랭킹</h3>

        {groupRanking.length > 0 ? (
          <GroupRank groupRanking={groupRanking} />
        ) : (
          <Card className="font-bold">아직 랭킹이 없어요!</Card>
        )}
      </div>
    </div>
  );
}
