import React, { useEffect, useState } from 'react';
import { API } from '../../../utils/axios';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import GroupItem from '../GroupItem';
import { useSelector } from 'react-redux';
import { Card } from 'flowbite-react';

export default function StudyGroup() {
  const [studyGroup, setStudyGroup] = useState([]);
  const userId = useSelector(state => state.user?.userInfo?.id);

  const navigate = useNavigate();
  useEffect(() => {
    const getGroupData = async () => {
      try {
        const response = await API.get('/group/all');
        console.log('카테고리 같은 스터디그룹 리스트 >>', response.data);
        const data = await response.data;
        setStudyGroup(data.data.filter(group => !group.members.includes(userId)));
      } catch (err) {
        console.error(err, '에러!!!!!!@#!@#@!#');
      }
    };
    getGroupData();
  }, []);

  const handleCreateGroup = () => {
    navigate('/group/create');
  };

  return (
    <section className="relative">
      <div className="top flex justify-between mb-5">
        <h2 className="font-bold text-2xl">이런 스터디는 어떠세요?</h2>
      </div>
      <div className="absolute top-1 right-0">
        <Button customStyle="rounded-lg" handleClick={handleCreateGroup}>
          스터디 만들기
        </Button>
      </div>
      <div>
        {!studyGroup.length && (
          <Card className="h-20 w-full">
            <h1 className="font-bold text-lg">아직 생성된 스터디그룹이 없어요!</h1>
            <p className="font-semibold">그룹을 생성해보세요!</p>
          </Card>
        )}

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
          {studyGroup?.map((item, index) => {
            const { _id, is_private, group_name, group_category, group_image_path, group_description, members } = item;
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
                  members={members}
                  groupInfo={item}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
