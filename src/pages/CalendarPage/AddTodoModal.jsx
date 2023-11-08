import { Button, Textarea, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from './DatePicker';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { API } from '../../utils/axios';
import moment from 'moment';

export default function AddTodoModal({ openModal, setOpenModal, selectedDate, setTodos }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTimeOfDay, setStartTimeOfDay] = useState('오후');
  const [endTimeOfDay, setEndTimeOfDay] = useState('오후');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      startHour: '4',
      startMinute: '00',
      endHour: '5',
      endMinute: '00',
    },
  });

  useEffect(() => {
    setStartDate(selectedDate);
    setEndDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    reset();
  }, [openModal]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleStartDateChange = date => {
    if (endDate && date > endDate) {
      setEndDate(date);
    }
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    if (startDate && date < startDate) {
      setStartDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
    }
    setEndDate(date);
  };

  const onSubmit = async data => {
    const ERR_MESSAGE = '시작 시간이 종료 시간보다 빨라야 합니다.';
    const startTime = startTimeOfDay === '오전' ? Number(data.startHour) : Number(data.startHour) + 12;
    const endTime = endTimeOfDay === '오전' ? Number(data.endHour) : Number(data.endHour) + 12;
    if (startDate === endDate) {
      if (startTime > endTime) return toast.error(ERR_MESSAGE);
      if (startTime === endTime) {
        if (data.startMinute > data.endMinute) return toast.error(ERR_MESSAGE);
      }
    }

    try {
      const momentStartDate = moment(startDate).format('yyyy, MM, DD');
      const momentEndDate = moment(endDate).format('yyyy, MM, DD');

      const newStateDate = new Date(momentStartDate);
      newStateDate.setHours(startTime);
      newStateDate.setMinutes(data.startMinute);

      const newEndDate = new Date(momentEndDate);
      newEndDate.setHours(endTime);
      newEndDate.setMinutes(data.endMinute);

      const body = {
        title: data.subject,
        content: data.content,
        start_time: newStateDate,
        end_time: newEndDate,
      };
      const response = await API.post('/todo_list', body);
      const newData = response.data.result;
      setTodos(prev => [...prev, newData]);
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal show={openModal} size="2xl" popup onClose={handleCloseModal} className="calendar-modal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">일정</h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="subject" value="제목" />
                </div>
                <TextInput
                  id="subject"
                  type="text"
                  {...register('subject', {
                    required: '제목을 입력하세요.',
                  })}
                />
              </div>
              {errors?.subject && <span className="text-danger">{errors.subject.message}</span>}
              <DatePicker
                label="시작"
                hourName="startHour"
                minuteName="startMinute"
                handleChange={handleStartDateChange}
                selectedDate={startDate}
                setTimeOfDay={setStartTimeOfDay}
                activeTimeOfDay={startTimeOfDay}
                register={register}
                errors={errors}
              />
              <DatePicker
                label="종료"
                hourName="endHour"
                minuteName="endMinute"
                handleChange={handleEndDateChange}
                selectedDate={endDate}
                setTimeOfDay={setEndTimeOfDay}
                activeTimeOfDay={endTimeOfDay}
                register={register}
                errors={errors}
              />

              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="내용" />
                </div>
                <Textarea id="comment" rows={4} {...register('content')} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">확인</Button>
            <Button type="button" color="gray" onClick={() => setOpenModal(false)}>
              취소
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
