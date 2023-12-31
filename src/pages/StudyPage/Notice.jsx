import { Link } from 'react-router-dom';
import { MdOutlineSms } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';
import { useEffect, useState } from 'react';
import { API } from '../../utils/axios';
import Button from '../../components/common/Button';

export default function Notice() {
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
    <section className="mb-10">
      <h2>공지사항</h2>
      <div className="rounded-[20px] py-[22px] px-5 bg-secondary">
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
                <SwiperSlide key={item._id}>
                  <Link to={`/notice/${item._id}`} className="select-none">
                    {item.title}
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </li>
          <li className="px-[35px] text-primary font-semibold">
            <Link to="/notice">
              <Button customStyle="rounded-lg bg-transparent !text-primary">더보기</Button>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
