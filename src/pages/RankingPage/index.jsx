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
  const [top3, setTop3] = useState({});
  const [other, setOther] = useState({});

  // console.log('뭐지??', top3, other);

  // 처음 들어왔을 때 디폴트 카테고리로 조회한 결과 보여주기
  const getFirstRank = async () => {
    try {
      const res = await API.get('/ranking');
      console.log('처음 마운트 시 랭킹 데이터 >>', res.data);
      // const { topUsers, topGroups } = res.data;
      setTop3({ userTop3: res.data.topUsers?.slice(0, 3), groupTop3: res.data.topGroups?.slice(0, 3) });
      setOther({ userOther: res.data.topUsers?.slice(3), groupOther: res.data.topGroups?.slice(3) });
    } catch (err) {
      console.error(err);
    }
  };

  // 카테고리별 탑텐 요청하는 함수.. 카테고리 바뀔때만 함수 재정의(useCallback)
  const getCategory = useCallback(async () => {
    // 바뀐 카테고리에 해당하는 랭킹 데이터 요청
    try {
      const res = await API.get(`/ranking?category=${category}`);
      console.log('카테고리 변경 후 응답 결과 >> ', res.data);
      // 유저와 그룹으로 구조분해
      const { topUsers, topGroups } = res.data;
      // 응답 결과로 top3, 나머지 state 업데이트
      setTop3(topUsers ? { userTop3: topUsers.slice(0, 3), groupTop3: res.data.topGroups?.slice(0, 3) } : {});
      setOther(topGroups ? { userOther: res.data.topUsers.slice(3), groupOther: res.data.topGroups?.slice(3) } : {});
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
    console.log('상태는 어떻게 됐지??', top3, other);
  }, [top3, other]);

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
        {Object.keys(top3).length > 0 ? (
          <UserRank userTop3={top3.userTop3} userOther={other.userOther} />
        ) : (
          <Card className="font-bold mb-5">아직 랭킹이 없어요!</Card>
        )}
        <h3 className="font-semibold text-xl mb-3">그룹 랭킹</h3>

        {Object.keys(other).length > 0 ? (
          <GroupRank groupTop3={top3.groupTop3} groupOther={other.groupOther} />
        ) : (
          <Card className="font-bold">아직 랭킹이 없어요!</Card>
        )}
      </div>
    </div>
  );
}
