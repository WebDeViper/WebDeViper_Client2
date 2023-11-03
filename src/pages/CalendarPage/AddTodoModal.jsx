import { Button, Textarea, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import DatePicker from './DatePicker';

export default function AddTodoModal({ openModal, setOpenModal, selectedValue }) {
  const subjectRef = useRef(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTimeOfDay, setStartTimeOfDay] = useState('오후');
  const [endTimeOfDay, setEndTimeOfDay] = useState('오후');

  useEffect(() => {
    setStartDate(selectedValue);
    setEndDate(selectedValue);
  }, [selectedValue]);

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

  console.log(startDate, endDate);

  const handleStartTimeOfDaySelection = e => {
    setStartTimeOfDay(e);
  };

  const handleEndTimeOfDaySelection = e => {
    setEndTimeOfDay(e);
  };

  return (
    <Modal
      show={openModal}
      size="2xl"
      popup
      onClose={handleCloseModal}
      initialFocus={subjectRef}
      className="calendar-modal"
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">일정</h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="subject" value="제목" />
            </div>
            <TextInput ref={subjectRef} id="subject" type="text" required />
          </div>
          <DatePicker
            text="시작"
            handleChange={handleStartDateChange}
            selectedDate={startDate}
            handleTimeOfDaySelection={handleStartTimeOfDaySelection}
            activeTimeOfDay={startTimeOfDay}
          />
          <DatePicker
            text="종료"
            handleChange={handleEndDateChange}
            selectedDate={endDate}
            handleTimeOfDaySelection={handleEndTimeOfDaySelection}
            activeTimeOfDay={endTimeOfDay}
          />

          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="comment" value="내용" />
            </div>
            <Textarea id="comment" required rows={4} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
