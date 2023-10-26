import { Link } from 'react-router-dom';
import { MdOutlineSms } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';

const data = [
  {
    desc: '우하하하',
  },
  {
    desc: '우핳핳핳',
  },
  {
    desc: '호롤롤롤',
  },
];

export default function Notice() {
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
              autoplay={{ delay: 4000 }}
              slidesPerView={1}
              allowTouchMove={false}
              loop={true}
              className="h-6"
            >
              {data.map((item, index) => (
                <SwiperSlide key={index}>{item.desc}</SwiperSlide>
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
