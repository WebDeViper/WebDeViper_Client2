import { useEffect, useState } from 'react';
import { API } from '../../../utils/axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NoticeModal from './PostNoticeModal';

export default function NoticePage() {
  const [notice, setNotice] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // 관리자 여부
  const isServiceAdmin = useSelector(state => state.user?.userInfo?.isServiceAdmin);

  const updateNotices = async () => {
    try {
      const response = await API.get('/notices');
      const data = await response.data;
      setNotice(data.notices.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    updateNotices();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main className="container">
      <div className="m-6">
        <h2 className="text-center">공지사항</h2>
        {isServiceAdmin && (
          <button onClick={openModal} className="bg-primary text-white p-2 rounded-md">
            공지사항 작성
          </button>
        )}
        <table className="w-full">
          <colgroup>
            <col width="0" />
            <col />
            <col width="0" />
          </colgroup>
          <thead className="border-b-2 border-black">
            <tr>
              <th className="p-2" colSpan={2}>
                제목
              </th>
              <th className="p-2">작성일</th>
            </tr>
          </thead>
          <tbody>
            {notice.map((item, index) => (
              <tr key={item._id} className="border-b-[1px] border-[rgba(0,0,0,0.3)]">
                <td className="p-3">
                  <div>{index + 1}</div>
                </td>
                <td className="p-3">
                  <div>
                    <Link to={`/notice/${item._id}`}>{item.title}</Link>
                  </div>
                </td>
                <td className="p-3">
                  <div>{moment(item.created_at).format('YYYY.MM.DD')}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && <NoticeModal closeModal={closeModal} updateNotices={updateNotices} />}
      </div>
    </main>
  );
}
