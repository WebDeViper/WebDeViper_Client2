import moment from 'moment-timezone';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './index.css';
import AddTodoModal from './AddTodoModal';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';
import { API } from '../../utils/axios';

export default function CalendarPage() {
  const [selectedValue, setSelectedValue] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodoList = async () => {
      const response = await API.get('/todo_lists');
      const data = await response.data;
      setTodos(data);
    };
    fetchTodoList();
  }, []);

  const handleOnChange = selectedValue => {
    setSelectedValue(selectedValue);
    setOpenModal(true);
  };

  const tileContent = ({ date, view }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');

    const matchingEvents = todos.filter(event => {
      const eventStartDate = moment(event.start_time).tz('Asia/Seoul').format('YYYY-MM-DD');
      const eventEndDate = moment(event.end_time).tz('Asia/Seoul').format('YYYY-MM-DD');
      return formattedDate >= eventStartDate && formattedDate <= eventEndDate;
    });

    const content1 = matchingEvents[0] ? matchingEvents[0].title : '';
    const content2 = matchingEvents[1] ? matchingEvents[1].title : '';

    return [
      <div key="content1">
        <p>{content1}</p>
      </div>,
      <div key="content2">
        <p>{content2}</p>
      </div>,
    ];
  };

  return (
    <div className="calendar w-10/12 mx-auto">
      <Calendar
        onChange={handleOnChange}
        value={selectedValue}
        minDetail="year"
        formatDay={(_, date) => moment(date).format('D')}
        className="mx-auto"
        tileContent={tileContent}
      />
      <AddTodoModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedValue={selectedValue}
        setTodos={setTodos}
      />
    </div>
  );
}
