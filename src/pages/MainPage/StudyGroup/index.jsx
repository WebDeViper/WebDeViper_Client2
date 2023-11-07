import React, { useEffect, useState } from 'react';
import { API } from '../../../utils/axios';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import GroupItem from '../StudyGroup/GroupItem';

export default function StudyGroup() {
  const [studyGroup, setStudyGroup] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getGroupData = async () => {
      try {
        const response = await API.get('/group/studyGroups');
        console.log('카테고리 같은 스터디그룹 리스트 >>', response.data);
        const data = await response.data;
        setStudyGroup(data.study_groups);
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
    <section className="mt-11">
      <div className="top flex justify-between mb-5">
        <h2 className="font-bold text-2xl">이런 스터디는 어떠세요?</h2>
        <Button customStyle="rounded-lg" handleClick={handleCreateGroup}>
          스터디 그룹 추가
        </Button>
      </div>
      <div>
        <Swiper
          navigation={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          slidesPerView={3}
          spaceBetween={10}
          className="swiper_custom p-3 h-72"
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
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
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
