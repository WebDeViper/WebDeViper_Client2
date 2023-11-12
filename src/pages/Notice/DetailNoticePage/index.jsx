import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../../utils/axios';
import moment from 'moment';
import { Badge } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function DetailNoticePage() {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState(null);

  // 관리자 여부
  const isServiceAdmin = useSelector(state => state.user?.userInfo?.isServiceAdmin);

  useEffect(() => {
    const getNotice = async () => {
      try {
        const response = await API.get(`/notice/${noticeId}`);
        const data = await response.data;
        setNotice(data.result);
      } catch (err) {
        console.error(err);
      }
    };
    getNotice();
  }, [noticeId]);

  const handleEdit = async () => {};
  const handleDelete = async () => {};

  return (
    <main className="container">
      <h2>공지사항</h2>
      <div>
        {notice && (
          <div>
            <div className="Notice_title mb-3">
              <h3>{notice.title}</h3>
            </div>
            <div className="flex gap-4 justify-end mb-6">
              <Badge color="indigo" size="lg">
                작성일
              </Badge>
              <span className="text-slate-400">{moment(notice.created_at).format('YYYY.MM.DD')}</span>
            </div>

            <div className="mb-5">
              <div className="Notice_postContent w-full p-5 shadow-md min-h-[200px] break-all md:break-keep">
                {notice.content}
              </div>
            </div>

            {/* 버튼을 추가합니다 */}
            {isServiceAdmin && (
              <div>
                <button onClick={handleEdit} className="bg-white shadow-md text-black p-2 rounded-md mr-2">
                  수정
                </button>
                <button onClick={handleDelete} className="bg-white shadow-md text-black p-2 rounded-md">
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
