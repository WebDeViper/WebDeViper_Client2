import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddTodo({ openModal, setOpenModal, selectedValue }) {
  const subjectRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={subjectRef}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">일정</h3>
          <div>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              dateFormat="yyyy.MM.dd"
              locale={ko}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="subject" value="제목" />
            </div>
            <TextInput ref={subjectRef} id="subject" type="text" required />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
