import { useEffect, useState } from 'react';
import { API } from '../../utils/axios';

export default function NoticePage() {
  const [notice, setNotice] = useState([]);
  useEffect(() => {
    const getNotices = async () => {
      try {
        const response = await API.get('/notices');
        const data = await response.data;
        setNotice(data);
      } catch (err) {
        console.error(err);
      }
    };
    getNotices();
  }, []);
  return (
    <div>
      {notice.map(item => (
        <div key={item.notice_id}>
          <div>{item.title}</div>
          <div>{item.content}</div>
        </div>
      ))}
    </div>
  );
}
