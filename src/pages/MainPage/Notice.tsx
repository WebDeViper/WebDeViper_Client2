import { Link } from 'react-router-dom';
import { MdOutlineSms } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';
import { useEffect, useState } from 'react';
import { API } from '../../utils/axios';

export default function Notice() {
  const [notice, setNotice] = useState<Notice[]>([]);
  useEffect(() => {
    const getNotices = async () => {
      try {
        const response = await API.get('/notices');
        const data = await response.data;
        // console.log(data);
        setNotice(data);
      } catch (err) {
        console.error(err);
      }
    };
    getNotices();
  }, []);

  return (
    <section>
      <h2 className="font-bold text-2xl">공지사항</h2>
      <div className="mt-5 rounded-[20px] py-[22px] px-5 bg-secondary">
        <ul className="flex items-center justify-between">
          <li>
            <span className="text-xl">
              <MdOutlineSms />
            </span>
          </li>
          <li className="ml-[25px] flex-1 truncate">
            <Swiper
              direction={'vertical'}
              modules={[Autoplay]}
              autoplay={{ delay: 2000 }}
              slidesPerView={1}
              allowTouchMove={false}
              // loop={true}
              className="h-6"
            >
              {notice.map(item => (
                <SwiperSlide key={item.notice_id}>
                  <Link to={`/notice/${item.notice_id}`} className="select-none">
                    {item.title}
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </li>
          <li className="px-[35px] text-primary font-semibold">
            <Link to="/notice">더보기</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
