import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../utils/axios';

export default function DetailNoticePage() {
  const [notice, setNotice] = useState();
  const { noticeId } = useParams();
  useEffect(() => {
    const getNotice = async () => {
      try {
        const response = await API.get(`/notices/${noticeId}`);
        const data = await response.data;
        console.log(data);
        setNotice(data);
      } catch (err) {
        console.error(err);
      }
    };
    getNotice();
  }, [noticeId]);
  return (
    <div>
      <h2>{notice?.title}</h2>
      <p>DetailNoticePage</p>
    </div>
  );
}
