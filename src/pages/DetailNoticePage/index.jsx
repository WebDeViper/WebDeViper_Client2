import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../utils/axios';

export default function DetailNoticePage() {
  const [notice, setNotice] = useState();
  const { noticeId } = useParams();
  // console.log(noticeId);
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
  return (
    <div>
      <h2>{notice?.title}</h2>
      <p>{notice?.content}</p>
    </div>
  );
}
