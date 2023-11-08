import React, { useEffect, useState } from 'react';
import { API } from '../../utils/axios';
import { chatSocket } from '../../utils/socketServer';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Button from '../../components/common/Button';

export default function DetailGroupPage() {
  const { groupId } = useParams();
  const location = useLocation();
  // console.log('@@@#$@#$#@$#@$@#$ location 새로고침>>>>', location);
  const { roomId, groupInfo } = location.state;
  const [isPending, setIsPending] = useState(null);
  const userId = useSelector(state => state.user?.userInfo?.id);
  // const { subject, imagePath, category, description, time, leader, maxMember } = groupInfo;
  // console.log('룸아이디 오는거 확인>>>', roomId);
  // console.log('그룹정보 오는거 확인>>>', groupInfo);
  const {
    _id,
    daily_goal_time,
    group_category,
    group_description,
    group_image_path,
    group_leader,
    group_maximum_member,
    group_name,
    join_requests,
    members,
  } = groupInfo;
  // console.log('잘되나>>', subject, imagePath, category, description, time, leader, maxMember);

  const navigate = useNavigate();

  // 채팅창 이동
  const handleChat = () => {
    chatSocket.emit('login', userName, res => {
      if (res && res.isOk) {
        console.log('successfully login', res);
        navigate(`/group/chat/${groupId}`);
      } else {
        console.log('fail to login', res);
        alert('로그인해주세요!');
      }
    });
  };

  // 뒤로가기
  const handleGoBack = () => {
    navigate(-1);
  };

  // 그룹 삭제
  const deleteGroup = async () => {
    try {
      const res = await API.delete(`group/studyGroup/${groupId}/members`);
      // console.log(res.data.message);
      alert(`${res.data.message}`);
      navigate('/');
    } catch (error) {
      console.error('그룹 삭제에 실패하셨습니다. ->', error);
    }
  };

  //그룹 탈퇴
  const leaveGroup = async () => {
    try {
      const res = await API.delete(`group/studyGroup/${groupId}`);
      // console.log(res.data.msg);
      alert(`${res.data.msg}`);
      navigate('/');
    } catch (error) {
      console.error('그룹 탈퇴에 실패하셨습니다. ->', error);
    }
  };

  // 신청중인 그룹 가져오기
  useEffect(() => {
    const getPendingGroups = async () => {
      try {
        const res = await API.get('/group/pendingGroups');
        // console.log('123213123', res.data.pendingGroups);
        setIsPending(res.data.pendingGroups.some(group => group._id === groupId) ? true : false);
      } catch (error) {
        console.error('Error fetching pending groups:', error);
      }
    };

    getPendingGroups();
  }, []);

  // 그룹 신청
  const handleGroupRequest = async groupId => {
    try {
      // console.log('그룹아이디는', groupId);
      const res = await API.post(`/group/studyGroup/${groupId}/join`);
      // console.log('상태코드는', res.status);

      if (!res.data.isFull) {
        // console.log('그룹신청완료 >>', res.data);
        const data = res.data.message;
        setIsPending(true);
        return alert(data);
      } else {
        return alert(`${res.data.message}`);
      }
    } catch (err) {
      console.error(err.message);
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  };

  const handleCancelRequest = () => {
    console.log('내가 신청중인 그룹 취소!!');
    // TODO: 그룹 신청 취소 api 연결
  };

  return (
    <div className="studyContentWrap flex flex-col break-all">
      <section className="studyContent_postHeader mb-5">
        <div className="btnWrap flex justify-between items-center mb-5">
          <Button handleClick={handleGoBack} customStyle={'!bg-transparent !text-primary !text-3xl'}>
            {<IoMdArrowRoundBack />}
          </Button>
          {!members.includes(userId) ? (
            isPending ? (
              <Button handleClick={handleCancelRequest} customStyle={'self-end'}>
                신청취소
              </Button>
            ) : (
              <Button handleClick={() => handleGroupRequest(groupId)} customStyle={'self-end'}>
                신청하기
              </Button>
            )
          ) : (
            <Button handleClick={handleChat} customStyle={'self-end'}>
              채팅창 이동하기
            </Button>
          )}
        </div>
        <div className="studyContent_title mb-3">
          <h1>{_id}에 대한 상세 페이지 레고</h1>
          {/* 그룹 제목 */}
          <h1 className="font-bold text-5xl">{group_name}</h1>
        </div>
        <div className="studyContent_user flex mb-3">
          {/* 그룹장 */}
          <span className="font-bold text-lg">그룹장: {group_leader}</span>
        </div>
        <section className="studyInfoWrap w-1/3">
          <ul className="grid grid-cols-2 gap-4">
            <li className="p-2 border bg-gray-100">카테고리 : {group_category}</li>
            <li className="p-2 border bg-gray-100">목표시간 : {daily_goal_time}</li>
            <li className="p-2 border bg-gray-100">
              인원 : {members.length} / {group_maximum_member}
            </li>
          </ul>
        </section>
      </section>

      <div className="studyContent_postContentWrap mb-5">
        <h2 className="text-xl font-semibold">그룹 소개</h2>
        <div className="studyContent_postContent border-2 w-full p-5">{group_description}</div>
      </div>

      <div className="studyContent_btnWrap self-center">
        {members.includes(userId) &&
          (group_leader === userId ? (
            <Button handleClick={deleteGroup} customStyle={'!bg-danger'}>
              그룹삭제
            </Button>
          ) : (
            <Button handleClick={leaveGroup} customStyle={'!bg-danger'}>
              그룹탈퇴
            </Button>
          ))}
      </div>
    </div>
  );
}
