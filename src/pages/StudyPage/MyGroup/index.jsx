import GroupItem from '../GroupItem';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import { API } from '../../../utils/axios';
import { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';

export default function MyGroup() {
  const [myGroups, setMyGroups] = useState([]);
  useEffect(() => {
    const getMyGroups = async () => {
      try {
        const res = await API.get('/group/studyGroups/users');
        console.log('내가 속한 그룹 ', res.data.study_groups);
        setMyGroups(res.data.study_groups);
      } catch (err) {
        console.error('에러!!!', err);
      }
    };

    getMyGroups();
  }, []);
  // console.log('내그룹', myGroups);
  return (
    <section>
      <h2 className="font-bold text-2xl mb-5">내가 속한 그룹</h2>
      {!myGroups.length && (
        <Card className="h-20 w-full">
          <h1 className="font-bold text-lg">아직 생성된 스터디그룹이 없어요!</h1>
          <p className="font-semibold">그룹을 생성해보세요!</p>
        </Card>
      )}
      {myGroups.length > 0 && (
        <Swiper
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          navigation={true}
          keyboard={true}
          modules={[Navigation, Pagination, Keyboard, Autoplay]}
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{ delay: 3000 }}
          className="swiper_custom p-3 h-72"
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={swiper => console.log(swiper)}
        >
          {myGroups?.map((item, index) => {
            const { _id, is_private, group_name, group_category, group_image_path, group_description } = item;
            if (is_private) {
              //is_private이 true 면 보여주지않음
              return null;
            }
            // const roomId = rooms.find(room => room.group === _id)._id;
            return (
              <SwiperSlide key={index}>
                <GroupItem
                  key={_id}
                  // roomId={roomId}
                  group_id={_id}
                  imagePath={group_image_path}
                  subject={group_name}
                  category={group_category}
                  description={group_description}
                  groupInfo={item}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
}
