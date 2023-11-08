import React, { useEffect, useState } from 'react';
import { API } from '../../../utils/axios';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
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
        const response = await API.get('/group/studyGroups');
        console.log('카테고리 같은 스터디그룹 리스트 >>', response.data);
        const data = await response.data;
        setStudyGroup(data.study_groups.filter(group => !group.members.includes(userId)));
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
        {!studyGroup.length && (
          <Card className="h-20 w-full">
            <h1 className="font-bold text-lg">아직 생성된 스터디그룹이 없어요!</h1>
            <p className="font-semibold">그룹을 생성해보세요!</p>
          </Card>
        )}

        <Swiper
          navigation={true}
          keyboard={true}
          modules={[Navigation, Pagination, Keyboard]}
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
