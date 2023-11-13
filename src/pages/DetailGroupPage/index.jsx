import React, { useEffect, useState } from 'react';
import { API } from '../../utils/axios';
import { chatSocket } from '../../utils/socketServer';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Button from '../../components/common/Button';
import { Badge } from 'flowbite-react';
import ChatPage from '../ChatPage';
import './index.css';

export default function DetailGroupPage() {
  const { groupId } = useParams();
  // const location = useLocation();
  // console.log('@@@#$@#$#@$#@$@#$ location 새로고침>>>>', location);
  // const { groupInfo } = location.state;
  const [groupInfo, setGroupInfo] = useState({});
  const [isPending, setIsPending] = useState(null);
  const { id: userId, nickName: userName } = useSelector(state => state.user?.userInfo);
  const [leaderName, setLeaderName] = useState('');
  const [profileImgPath, setProfileImgPath] = useState('');
  const [isChatOn, setIsChatOn] = useState(false);
  // const { subject, imagePath, category, description, time, leader, maxMember } = groupInfo;
  // console.log('룸아이디 오는거 확인>>>', roomId);
  // console.log('그룹정보 오는거 확인>>>', groupInfo);

  // console.log('잘되나>>', subject, imagePath, category, description, time, leader, maxMember);

  const navigate = useNavigate();

  // 채팅창 이동
  const handleChat = () => {
    chatSocket.emit('login', userName, res => {
      if (res && res.isOk) {
        console.log('successfully login', res);
        // navigate(`/group/chat/${groupId}`);
        setIsChatOn(true);
      } else {
        console.log('fail to login', res);
        alert('로그인해주세요!');
      }
    });
  };

  // 뒤로가기
  // const handleGoBack = () => {
  //   navigate(-1);
  // };

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

  useEffect(() => {
    const getGroupInfo = async () => {
      try {
        const res = await API.get(`/group/find/${groupId}`);
        if (res.data.isSuccess) {
          setGroupInfo(prevGroupInfo => {
            const newGroupInfo = res.data.GroupInfo;
            if (Object.keys(newGroupInfo).length > 0) {
              (async () => {
                const leaderRes = await API.get(`/user/${newGroupInfo.group_leader}`);
                if (leaderRes.data.isSuccess) {
                  const leaderInfo = leaderRes.data.userInfo;
                  setLeaderName(leaderInfo.nick_name);
                  setProfileImgPath(leaderInfo.user_profile_image_path);
                }
              })();
            }
            return newGroupInfo;
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    getGroupInfo();
  }, [groupId]);

  useEffect(() => {
    const getPendingGroups = async () => {
      try {
        const res = await API.get('/group/pendingGroups');
        setIsPending(res.data.pendingGroups.some(group => group._id === groupId) ? true : false);
      } catch (error) {
        console.error('Error fetching pending groups:', error);
      }
    };
    getPendingGroups();
  }, [groupId, isPending]);

  const handleGroupRequest = async groupId => {
    try {
      const res = await API.post(`/group/studyGroup/${groupId}/join`);
      if (!res.data.isFull) {
        const data = res.data.message;
        setIsPending(true);
        alert(data);
      } else {
        alert(`${res.data.message}`);
      }
    } catch (err) {
      console.error(err.message);
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  };

  const handleCancelRequest = async () => {
    try {
      const res = await API.delete(`/group/studyGroup/${groupId}/joinRequests`);
      if (res.data.isSuccess) {
        setIsPending(false);
        alert(`${res.data.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const {
    _id,
    daily_goal_time,
    group_category,
    group_description,
    group_image_path,
    group_leader,
    group_maximum_member,
    group_name,
    members,
  } = groupInfo;

  return (
    <div className="container">
      <div className={`allWrap relative ${isChatOn ? 'chat-open' : ''}`}>
        {Object.keys(groupInfo).length === 0 && <div className="loading">로딩 중...</div>}
        {Object.keys(groupInfo).length > 0 && (
          <div className="studyContentWrap flex flex-col break-all">
            <div className="btnWrap flex justify-end items-center mb-5">
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
                  채팅하기
                </Button>
              )}
            </div>
            {/* 그룹 제목 */}
            <h2>{group_name}</h2>
            <div className="flex items-center mb-6">
              {/* 그룹장 */}
              <img
                className="rounded-full w-10 h-10 me-3"
                src={profileImgPath ? import.meta.env.VITE_APP_BACK_URL + profileImgPath : ''}
                alt="유저 프로필 이미지"
              />
              <span>{leaderName}</span>
            </div>
            <div className="mb-10">
              <ul className="grid md:grid-cols-2 grid-cols-3 gap-y-4">
                <li className="flex md:flex-row flex-col items-center gap-2">
                  <Badge color="indigo" size="lg" className="font-semibold">
                    카테고리
                  </Badge>
                  <span className="font-semibold">{group_category}</span>
                </li>
                <li className="flex md:flex-row flex-col items-center gap-2">
                  <Badge color="indigo" size="lg" className="font-semibold">
                    목표시간
                  </Badge>
                  <span className="font-semibold">{daily_goal_time}</span>
                </li>
                <li className="flex md:flex-row flex-col items-center gap-2">
                  <Badge color="indigo" size="lg" className="font-semibold">
                    인원
                  </Badge>
                  <span className="font-semibold">
                    {members.length} / {group_maximum_member}
                  </span>
                </li>
              </ul>
            </div>

            <h3>그룹 소개</h3>
            <div className="mb-5">
              <div className="studyContent_postContent w-full p-5 shadow-md min-h-[200px] break-all md:break-keep">
                {group_description ? group_description : ''}
              </div>
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
        )}
        {isChatOn && (
          <div className="chatPage h-screen">
            <ChatPage setIsChatOn={setIsChatOn} groupId={groupId} />
          </div>
        )}
      </div>
    </div>
  );
}
