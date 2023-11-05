import GroupItem from './GroupItem';
// import './style.css';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { API } from '../../../utils/axios';
import { useEffect, useState } from 'react';
import socket from '../../../utils/socketServer';

const data = [
  {
    group_id: 1,
    name: '열공파이아 내 머릿속을 boom boom boom',
    password: '1234',
    group_category_name: '대학생',
    group_image_path:
      'https://i.namu.wiki/i/tJ3mYQ4YfWJeo5E8ffXEMsN07BuOcBHW04v0gxBlyU1vTQKao0Ag4eKJPQOn3FBeOIWOjNsvTJ6rN-kYk3Mhv2Ee5erFNkwCRLGpwodnH3B4g10aq82OVF39iwLrnqCEVGwWmyR5bag_b3RQPiRWLA.webp',
    description: '1아니면 0으로 공부합니다.',
    daily_goal_time: 3,
    maximum_number_member: 2,
    is_camera_on: true,
    createdAt: '2023-10-26T20:20:23.000Z',
    updatedAt: '2023-10-26T20:20:23.000Z',
  },
  {
    group_id: 2,
    name: '요리고수가 되고싶은자 나에게로',
    password: 'alsdud1106',
    group_category_name: '초등학생',
    group_image_path:
      'https://i.namu.wiki/i/tJ3mYQ4YfWJeo5E8ffXEMsN07BuOcBHW04v0gxBlyU1vTQKao0Ag4eKJPQOn3FBeOIWOjNsvTJ6rN-kYk3Mhv2Ee5erFNkwCRLGpwodnH3B4g10aq82OVF39iwLrnqCEVGwWmyR5bag_b3RQPiRWLA.webp',
    description: '남자가 내릴것은, 달콤한 커피뿐입니다.,,,',
    daily_goal_time: 7,
    maximum_number_member: 5,
    is_camera_on: true,
    createdAt: '2023-10-26T11:23:29.000Z',
    updatedAt: '2023-10-26T11:23:29.000Z',
  },
  {
    group_id: 2,
    name: '요리고수가 되고싶은자 나에게로',
    password: 'alsdud1106',
    group_category_name: '초등학생',
    group_image_path:
      'https://i.namu.wiki/i/tJ3mYQ4YfWJeo5E8ffXEMsN07BuOcBHW04v0gxBlyU1vTQKao0Ag4eKJPQOn3FBeOIWOjNsvTJ6rN-kYk3Mhv2Ee5erFNkwCRLGpwodnH3B4g10aq82OVF39iwLrnqCEVGwWmyR5bag_b3RQPiRWLA.webp',
    description: '남자가 내릴것은, 달콤한 커피뿐입니다.,,,',
    daily_goal_time: 7,
    maximum_number_member: 5,
    is_camera_on: true,
    createdAt: '2023-10-26T11:23:29.000Z',
    updatedAt: '2023-10-26T11:23:29.000Z',
  },
  {
    group_id: 2,
    name: '요리고수가 되고싶은자 나에게로',
    password: 'alsdud1106',
    group_category_name: '초등학생',
    group_image_path:
      'https://i.namu.wiki/i/tJ3mYQ4YfWJeo5E8ffXEMsN07BuOcBHW04v0gxBlyU1vTQKao0Ag4eKJPQOn3FBeOIWOjNsvTJ6rN-kYk3Mhv2Ee5erFNkwCRLGpwodnH3B4g10aq82OVF39iwLrnqCEVGwWmyR5bag_b3RQPiRWLA.webp',
    description: '남자가 내릴것은, 달콤한 커피뿐입니다.,,,',
    daily_goal_time: 7,
    maximum_number_member: 5,
    is_camera_on: true,
    createdAt: '2023-10-26T11:23:29.000Z',
    updatedAt: '2023-10-26T11:23:29.000Z',
  },
  {
    group_id: 2,
    name: '요리고수가 되고싶은자 나에게로',
    password: 'alsdud1106',
    group_category_name: '초등학생',
    group_image_path:
      'https://i.namu.wiki/i/tJ3mYQ4YfWJeo5E8ffXEMsN07BuOcBHW04v0gxBlyU1vTQKao0Ag4eKJPQOn3FBeOIWOjNsvTJ6rN-kYk3Mhv2Ee5erFNkwCRLGpwodnH3B4g10aq82OVF39iwLrnqCEVGwWmyR5bag_b3RQPiRWLA.webp',
    description: '남자가 내릴것은, 달콤한 커피뿐입니다.,,,',
    daily_goal_time: 7,
    maximum_number_member: 5,
    is_camera_on: true,
    createdAt: '2023-10-26T11:23:29.000Z',
    updatedAt: '2023-10-26T11:23:29.000Z',
  },
  {
    group_id: 2,
    name: '요리고수가 되고싶은자 나에게로',
    password: 'alsdud1106',
    group_category_name: '초등학생',
    group_image_path:
      'https://i.namu.wiki/i/tJ3mYQ4YfWJeo5E8ffXEMsN07BuOcBHW04v0gxBlyU1vTQKao0Ag4eKJPQOn3FBeOIWOjNsvTJ6rN-kYk3Mhv2Ee5erFNkwCRLGpwodnH3B4g10aq82OVF39iwLrnqCEVGwWmyR5bag_b3RQPiRWLA.webp',
    description: '남자가 내릴것은, 달콤한 커피뿐입니다.,,,',
    daily_goal_time: 7,
    maximum_number_member: 5,
    is_camera_on: true,
    createdAt: '2023-10-26T11:23:29.000Z',
    updatedAt: '2023-10-26T11:23:29.000Z',
  },
];
// const handleRooms = rooms => {
//   setRooms(rooms);
// };
// socket.on('rooms', handleRooms);
export default function MyGroup() {
  // const [rooms, setRooms] = useState([]);

  const [myGroups, setMyGroups] = useState([]);
  useEffect(() => {
    const getMyGroups = async () => {
      try {
        const res = await API.get('/group/studyGroups/users');
        console.log(res.data.study_groups);
        setMyGroups(res.data.study_groups);
      } catch (err) {
        console.error('에러!!!', err);
      }
    };

    getMyGroups();
  }, []);
  console.log('내그룹', myGroups);
  return (
    <section>
      <h2 className="font-bold text-2xl">내가 속한 그룹</h2>
      <div>
        <Swiper
          navigation={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          slidesPerView={3}
          spaceBetween={10}
          className="swiper_custom"
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
        >
          {myGroups?.map((item, index) => {
            const { _id, group_name, group_category, group_image_path, group_description } = item;
            // const roomId = rooms.find(room => room.group === _id)._id;
            return (
              <SwiperSlide key={index} className="">
                <GroupItem
                  // roomId={roomId}
                  group_id={_id}
                  imagePath={group_image_path}
                  subject={group_name}
                  category={group_category}
                  description={group_description}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
