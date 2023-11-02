import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './index.css';
import { Button } from 'flowbite-react';
import AddTodo from './AddTodo';

export default function CalendarPage() {
  const [selectedValue, setSelectedValue] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);

  const handleOnChange = selectedValue => {
    // setSelectedValue(moment(selectedValue).format('YYYY-MM-DD'));
    setSelectedValue(selectedValue);
    setOpenModal(true);
  };

  console.log(selectedValue);

  return (
    <div className="calendar w-10/12 mx-auto">
      <Calendar
        onChange={handleOnChange}
        value={selectedValue}
        minDetail="year"
        formatDay={(_, date) => moment(date).format('D')}
        className="mx-auto"
        tileContent={({ activeStartDate, date, view }) => <p>It's Sunday!</p>}
      />
      <AddTodo openModal={openModal} setOpenModal={setOpenModal} selectedValue={selectedValue} />
    </div>
  );
}
