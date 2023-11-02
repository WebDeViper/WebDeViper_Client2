import { Button, Textarea, Label, Modal, TextInput, ListGroup } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddTodo({ openModal, setOpenModal, selectedValue }) {
  const subjectRef = useRef(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [time, setTime] = useState({ h: '3', m: '00' });
  const [activeItem, setActiveItem] = useState('오전');

  useEffect(() => {
    setStartDate(selectedValue);
    setEndDate(selectedValue);
  }, [selectedValue]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEndDateChange = date => {
    if (startDate && date < startDate) {
      setStartDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
    }
    setEndDate(date);
  };

  const handleItemClick = selectedTimePeriod => {
    setActiveItem(selectedTimePeriod);
  };

  const handleOnChangeTime = () => {};

  return (
    <Modal show={openModal} popup onClose={handleCloseModal} initialFocus={subjectRef} className="calendar-modal">
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div>시작</div>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat="yyyy.MM.dd"
                locale={ko}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-4">
                <ListGroup className="w-16">
                  <ListGroup.Item
                    className="time-period"
                    onClick={() => handleItemClick('오전')}
                    active={activeItem === '오전'}
                  >
                    오전
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="time-period"
                    onClick={() => handleItemClick('오후')}
                    active={activeItem === '오후'}
                  >
                    오후
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="flex items-center gap-1">
                <div>
                  <TextInput id="small" type="text" sizing="sm" />
                  <div className="block">
                    <Label htmlFor="small" value="시간" />
                  </div>
                </div>
                <span className="mb-7">:</span>
                <div>
                  <TextInput id="small" type="text" sizing="sm" />
                  <div className="block">
                    <Label htmlFor="small" value="분" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>종료</div>
            <DatePicker selected={endDate} onChange={handleEndDateChange} dateFormat="yyyy.MM.dd" locale={ko} />
          </div>

          <div className="max-w-md">
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
