import { useEffect, useState } from 'react';
import { API } from '../../utils/axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function NoticePage() {
  const [notice, setNotice] = useState([]);
  useEffect(() => {
    const getNotices = async () => {
      try {
        const response = await API.get('/notices');
        const data = await response.data;
        setNotice(data.notices);
      } catch (err) {
        console.error(err);
      }
    };
    getNotices();
  }, []);
  return (
    <div className="m-6">
      <h2 className="text-center mb-5 text-xl font-bold">공지사항</h2>
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
          {notice.reverse().map((item, index) => (
            <tr key={item._id} className="border-b-[1px] border-[rgba(0,0,0,0.3)]">
              <td className="p-3">{index}</td>
              <td className="p-3">
                <Link to={`/notice/${item._id}`}>{item.title}</Link>
              </td>
              <td className="p-3">{moment(item.createdAt).format('YYYY.MM.DD')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
