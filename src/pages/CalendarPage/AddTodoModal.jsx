import { Button, Textarea, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from './DatePicker';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

export default function AddTodoModal({ openModal, setOpenModal, selectedValue }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTimeOfDay, setStartTimeOfDay] = useState('오후');
  const [endTimeOfDay, setEndTimeOfDay] = useState('오후');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setStartDate(selectedValue);
    setEndDate(selectedValue);
  }, [selectedValue]);

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

  const onSubmit = data => {
    console.log(data);
    setOpenModal(false);
  };

  const toastError = msg => {
    toast.error(msg);
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
                    required: '유효한 시간을 입력하세요.',
                  })}
                />
              </div>
              {errors?.subject && openModal && toastError(errors.subject.message)}
              <DatePicker
                label="시작"
                handleChange={handleStartDateChange}
                selectedDate={startDate}
                setTimeOfDay={setStartTimeOfDay}
                activeTimeOfDay={startTimeOfDay}
              />
              <DatePicker
                label="종료"
                handleChange={handleEndDateChange}
                selectedDate={endDate}
                setTimeOfDay={setEndTimeOfDay}
                activeTimeOfDay={endTimeOfDay}
              />

              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="내용" />
                </div>
                <Textarea id="comment" rows={4} />
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
